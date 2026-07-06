import { useNavigate, useParams } from "react-router-dom";
import "./one-to-one.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../shared/interceptor/interceptor";
import { formatTime } from "../../../helpers/common-helpers";
import { useEffect, useRef, useState } from "react";
import { API_CONFIG } from "../../shared/api-config/api-config";
import { socket } from "../../../../socket";
import { getLocalStorageObjDetails } from "../../shared/helper/helper";

const OneToOne = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const itemChatRef = useRef<Record<string, HTMLDivElement | null>>({});
  const userID = JSON.parse(getLocalStorageObjDetails("userData")).userID;
  const paramId = useParams();
  const [activeChatId, setActiveID] = useState(paramId.id);
  const [isTyping, setIsTyping] = useState();
  console.log("userid", userID);

  const triggerAnimation = (chatId: any) => {
    console.log("chat id", chatId);
    const el = itemChatRef.current[chatId];
    if (!el) return;
    const parent = el.parentElement;
    if (parent && parent.firstChild === el) return;
    el.classList.remove("animate-in", "flash");
    void el.offsetWidth;
    console.log("item chat ref", el);
    el.classList.add("animate-in");
    el.addEventListener(
      "animationend",
      () => {
        el.classList.remove("animate-in");
        el.classList.add("flash");
        el.addEventListener(
          "animationend",
          () => {
            el.classList.remove("flash");
          },
          { once: true },
        );
      },
      { once: true },
    );
  };

  const fetchUpdateChatResult = async () => {
    const res = await axiosInstance.get(
      "http://localhost:5000/auth/api/get-update-list",
    );
    return res.data.result;
  };

  const { data } = useQuery({
    queryKey: ["update-list"],
    queryFn: fetchUpdateChatResult,
  });

  const updateSeenStatus = async (id: string) => {
    await axiosInstance.patch(
      `${API_CONFIG.BaseUrl}${API_CONFIG.UPDATESEENMSG}/${id}`,
      { id },
    );
  };

  const { mutate: updateSeen } = useMutation({
    mutationFn: updateSeenStatus,
  });

  const handleNavigation = (item) => {
    console.log("navigation item", item);
    queryClient.setQueryData(["update-list"], (oldData: any) => {
      if (!oldData) return oldData;

      return oldData.map((itx: any) => {
        if (Number(item.chat_id) === Number(item.chat_id)) {
          return {
            ...itx,
            unread_count: 0,
          };
        }
        return itx;
      });
    });
    updateSeen(item.chat_id);
    setActiveID(item.chat_id);
    navigate(`/chats/${item.chat_id}`, {
      state: item,
    });
  };

  useEffect(() => {
    const handleChatListUpdate = (msg) => {
      console.log("whatkind", msg);
      queryClient.setQueryData(["update-list"], (oldData: any) => {
        if (!oldData) return oldData;

        const chatIndex = oldData.findIndex(
          (itx) => Number(itx.chat_id) === Number(msg.chatId),
        );

        if (chatIndex === -1) {
          queryClient.invalidateQueries({ queryKey: ["update-list"] });
          return oldData;
        }
        const isSentByUser = Number(msg.sender_id) === Number(userID);

        const updatedData = [...oldData];
        updatedData[chatIndex] = {
          ...updatedData[chatIndex],
          message_text: msg.message_text,
          last_message_time: new Date().toISOString(),
          unread_count: isSentByUser
            ? 0
            : updatedData[chatIndex].unread_count + 1,
        };

        // Bubble updated chat to top
        const [updatedChat] = updatedData.splice(chatIndex, 1);
        console.log("what is updateCHat", updatedChat);
        return [updatedChat, ...updatedData];
      });

      setTimeout(() => triggerAnimation(Number(msg.chatId)), 50);
    };
    socket.on("chat_list_update", handleChatListUpdate);

    return () => {
      socket.off("chat_list_update", handleChatListUpdate);
    };
  }, [queryClient, userID]);

  useEffect(() => {
    const handleTyping = (msg: any) => {
      console.log("typing ind", msg);
      if (Number(msg.senderId) === Number(userID)) return;

      setIsTyping((prev: any) => ({
        ...prev,
        [msg.chatId]: true,
      }));

      setTimeout(() => {
        setIsTyping((prev: any) => ({
          ...prev,
          [msg.chatId]: false,
        }));
      }, 1000);
    };

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [userID]);

  return (
    <div className="one-to-one-container">
      <div className="chat-one-container">
        {data?.map((item: any) => {
          console.log("data in chat list", data);
          return (
            <div
              key={item.chat_id}
              ref={(el) => {
                itemChatRef.current[item.chat_id] = el;
              }}
              className={`profile-msg-container ${activeChatId == item.chat_id ? "active" : ""}`}
              onClick={() => {
                handleNavigation(item);
              }}
            >
              <div className="border-radius"></div>
              <div className="message-section">
                <div className="upper-text">
                  <span className="label-text bold-text-medium-xxs">
                    {item.display_name}
                  </span>
                  <span className="sub-text text-body-xs">
                    {formatTime(item.last_message_time)}
                  </span>
                </div>
                <div className="upper-text">
                  <span className="sub-text text-body-xs">
                    {isTyping?.[item?.chat_id]
                      ? "typing..."
                      : item.message_text}
                  </span>
                  {item.unread_count > 0 ? (
                    <span className="counter text-body-xs">
                      {item.unread_count}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OneToOne;
