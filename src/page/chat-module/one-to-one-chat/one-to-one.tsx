import { useNavigate } from "react-router-dom";
import "./one-to-one.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../shared/interceptor/interceptor";
import { formatTime } from "../../../helpers/common-helpers";
import { useEffect } from "react";
import { API_CONFIG } from "../../shared/api-config/api-config";
import { socket } from "../../../../socket";

const OneToOne = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    const handleChatListUpdate = (msg) => {
      console.log("whatkind", msg);
      queryClient.setQueryData(["update-list"], (oldData: any) => {
        if (!oldData) return oldData;

        const chatIndex = oldData.findIndex(
          (itx) => Number(itx.chat_id) === Number(msg.chatId),
        );

        if (chatIndex === -1) return oldData;

        const updatedData = [...oldData];
        updatedData[chatIndex] = {
          ...updatedData[chatIndex],
          message_text: msg.message_text,
          last_message_time: new Date().toISOString(),
          unread_count: updatedData[chatIndex].unread_count + 1,
        };

        // Bubble updated chat to top
        const [updatedChat] = updatedData.splice(chatIndex, 1);
        console.log("what is updateCHat", updatedChat);
        return [updatedChat, ...updatedData];
      });
    };

    socket.on("chat_list_update", handleChatListUpdate);

    return () => {
      socket.off("chat_list_update", handleChatListUpdate);
    };
  }, [queryClient]);

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
