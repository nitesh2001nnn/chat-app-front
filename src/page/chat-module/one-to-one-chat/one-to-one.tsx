import { useNavigate } from "react-router-dom";
import "./one-to-one.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../shared/interceptor/interceptor";
import { formatTime } from "../../../helpers/common-helpers";
import { useEffect } from "react";
import { API_CONFIG } from "../../shared/api-config/api-config";
import { socket } from "../../../../socket";

import { getLocalStorageObjDetails } from "../../shared/helper/helper";

const OneToOne = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userID = JSON.parse(getLocalStorageObjDetails("userData")).userID;

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
    updateSeen(item.chat_id);
    navigate(`/chats/${item.chat_id}`, {
      state: item,
    });
  };

  useEffect(() => {
    const handleMsgUpdate = (msg: any) => {
      console.log("mesg waht coming here", msg);
      queryClient.setQueryData(["update-list"], (oldData: any) => {
        console.log("what data cojing here", oldData);

        if (!oldData) return oldData;

        const chatIndex = oldData.findIndex(
          (itx) => Number(itx.chat_id) === Number(msg.chatId),
        );

        console.log("chat index", chatIndex);

        if (chatIndex != -1) {
          const updatedChat = {
            ...oldData[chatIndex],
            message_text: msg.message_text,
            last_message_time: new Date().toISOString(),
            unread_count:
              msg.sender_id === userID
                ? oldData[chatIndex].unread_count
                : oldData[chatIndex].unread_count + 1,
          };

          const newData = [...oldData];

          newData.splice(chatIndex, 1);

          newData.unshift(updatedChat);
          console.log("update data", updatedChat);
          return newData;
        }
        return oldData;
      });
    };
    socket.on("reciever_message", handleMsgUpdate);
    // socket.on("send_message", handleMsgUpdate);
    return () => {
      socket.off("reciever_message", handleMsgUpdate);
      // socket.off("send_message", handleMsgUpdate);
    };
  }, [queryClient, userID, data]);

  // useEffect(() => {
  //   fetchUpdateChatList();
  // }, []);

  console.log("response", data);

  return (
    <div className="one-to-one-container">
      <div className="chat-one-container">
        {data?.map((item: any) => {
          return (
            <div
              key={item.chat_id}
              className="profile-msg-container"
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
                    {item.message_text}
                  </span>
                  <span className="counter text-body-xs">
                    {" "}
                    {item.unread_count}
                  </span>
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
