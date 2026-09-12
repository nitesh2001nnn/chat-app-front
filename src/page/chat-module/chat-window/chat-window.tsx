import { useLocation, useParams } from "react-router-dom";
import ChatBottomBar from "./chat-bottom-bar/chat-bottom-bar";
import ChatMiddleBar from "./chat-middle-bar/chat-middle-bar";
import ChatTopBar from "./chat-top-bar/chat-top-bar";
import ChatEmptyState from "./chat-empty-state/chat-empty-state";
import "./chat-window.scss";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../shared/interceptor/interceptor";
import { socket } from "../../../../socket";
import { getLocalStorageObjDetails } from "../../shared/helper/helper";
import { useAuth } from "../../../../auth-context";

type messageType = {
  id: number;
  message_text: string;
  incoming_msg?: string;
  sender_id: number;
  status?: string;
  isSeen?: number;
};

interface ActiveChatWindowProps {
  id: string;
}

const ActiveChatWindow = ({ id }: ActiveChatWindowProps) => {
  const { state } = useLocation();
  const { onlineUsers } = useAuth();
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<any>(null);

  const rawUserData = getLocalStorageObjDetails("userData");
  const userID = rawUserData ? JSON.parse(rawUserData)?.userID : null;

  const handleMessage = () => {
    if (!value.trim()) return;

    socket.emit("send_message", {
      chatId: id,
      recieverId: state?.other_user_id,
      message: value,
    });

    // Immediately stop typing when message is sent
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    socket.emit("stop_typing", {
      chatId: id,
      recieverId: state?.other_user_id,
      senderId: userID,
    });

    setValue("");
  };

  const handleInputChange = (val: string) => {
    setValue(val);

    // Emit typing event
    socket.emit("typing", {
      chatId: id,
      recieverId: state?.other_user_id,
      senderId: userID,
    });

    // Clear previous timeout
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    // Set new timeout to stop typing after 2 seconds of inactivity
    typingRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        chatId: id,
        recieverId: state?.other_user_id,
        senderId: userID,
      });
    }, 2000);
  };

  const fetchMessages = async () => {
    const res = await axiosInstance.get(
      `http://localhost:5000/auth/api/updated-messages/${id}`,
    );
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["data", id],
    queryFn: fetchMessages,
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.result) {
      setMessages(data.result);
      if (state?.other_user_id) {
        socket.emit("seen_msg", {
          chatId: id,
          senderId: state.other_user_id,
        });
      }
    }
  }, [data, id, state?.other_user_id]);

  useEffect(() => {
    const handleRecieverMessage = (msg: any) => {
      if (Number(msg.chatId) === Number(id)) {
        setMessages((prev) => [...prev, msg]);
        if (state?.other_user_id) {
          socket.emit("seen_msg", {
            chatId: id,
            senderId: state.other_user_id,
          });
        }
      }
    };

    const handleMsgSeen = ({ chatId }: any) => {
      if (Number(chatId) !== Number(id)) return;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.sender_id === userID
            ? { ...msg, isSeen: 1, status: "seen" }
            : msg,
        ),
      );
    };

    socket.on("reciever_message", handleRecieverMessage);
    socket.on("msg_seen", handleMsgSeen);

    return () => {
      socket.off("reciever_message", handleRecieverMessage);
      socket.off("msg_seen", handleMsgSeen);
    };
  }, [id, userID, state?.other_user_id]);

  useEffect(() => {
    const handleTyping = ({ chatId }: any) => {
      if (Number(chatId) !== Number(id)) return;
      setIsTyping(true);
    };
    const handleStopTyping = ({ chatId }: any) => {
      if (Number(chatId) !== Number(id)) return;
      setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [id]);

  return (
    <div className="chat-window">
      <ChatTopBar
        name={state?.display_name}
        profile_icon={state?.profile_icon}
        active_status={
          isTyping
            ? "typing..."
            : onlineUsers.some(
                  (uid: any) => String(uid) === String(state?.other_user_id),
                )
              ? "online"
              : "offline"
        }
      />
      <ChatMiddleBar value={messages as any} chatId={Number(id)} />
      <ChatBottomBar
        onChange={handleInputChange}
        value={value}
        onSend={handleMessage}
      />
    </div>
  );
};

/**
 * ChatWindow acts as the right-side pane coordinator.
 * When an active chat ID is present in the route (:id), it renders the ActiveChatWindow.
 * When no chat ID is present (e.g. on /contact or /chats empty state), it renders the ChatEmptyState fallback view.
 */
const ChatWindow = () => {
  const { id } = useParams();

  if (!id) {
    return <ChatEmptyState />;
  }

  return <ActiveChatWindow key={id} id={id} />;
};

export default ChatWindow;
