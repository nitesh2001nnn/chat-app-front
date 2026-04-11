import { useLocation, useMatch, useParams } from "react-router-dom";
import ChatBottomBar from "./chat-bottom-bar/chat-bottom-bar";
import ChatMiddleBar from "./chat-middle-bar/chat-middle-bar";
import ChatTopBar from "./chat-top-bar/chat-top-bar";
import "./chat-window.scss";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../shared/interceptor/interceptor";
import { socket } from "../../../../socket";
import { getLocalStorageObjDetails } from "../../shared/helper/helper";
import axios from "axios";
import { API_CONFIG } from "../../shared/api-config/api-config";

type messageType = {
  id: number;
  message_text: string;
  sender_id: number;
};

const ChatWindow = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const userID = JSON.parse(getLocalStorageObjDetails("userData")).userID;

  const handleMessage = () => {
    socket.emit("send_message", {
      chatId: id,

      recieverId: state?.other_user_id,
      message: value,
    });
    setValue("");
  };

  console.log("state", state, messages, id);

  const fetchMessages = async () => {
    const res = await axiosInstance.get(
      `http://localhost:5000/auth/api/updated-messages/${id}`,
    );
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["data", id],
    queryFn: fetchMessages,
  });
  console.log("data in messages", data);

  useEffect(() => {
    if (data) {
      setMessages(data.result);
      socket.emit("seen_msg", {
        chatId: id,
        senderId: state?.other_user_id,
      });
    }
  }, [data]);

  // Removed useEffect on [id, messages] to prevent ping-pong loop

  useEffect(() => {
    const handleRecieverMessage = (msg: any) => {
      console.log("waht type of message coming  here", msg);
      if (Number(msg.chatId) === Number(id)) {
        setMessages((prev) => [...prev, msg]);
        socket.emit("seen_msg", {
          chatId: id,
          senderId: state?.other_user_id,
        });
      }
    };

    const handleMsgSeen = ({ chatId }: any) => {
      console.log("chat coming or not", chatId);
      if (Number(chatId) != Number(id)) return;
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

  console.log("messages", messages);

  if (!id) {
    return <div>No Chat option selected</div>;
  }
  return (
    <div className="chat-window">
      <ChatTopBar
        name={state?.display_name}
        profile_icon={state?.profile_icon}
      />
      <ChatMiddleBar value={messages} chatId={id} />
      <ChatBottomBar onChange={setValue} value={value} onSend={handleMessage} />
    </div>
  );
};

export default ChatWindow;
