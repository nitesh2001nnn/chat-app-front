import { useNavigate } from "react-router-dom";
import "./contact.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchContacts,
  getOrCreateChat,
} from "../add-contacts/api/add-contact-services";
import { useEffect } from "react";
import Avatar from "../../../common-component/avatar/avatar";
import { API_CONFIG } from "../../shared/api-config/api-config";
import { SENDiNVITATION } from "./api/contact-service";

const Contacts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["fetch-contact"],
    queryFn: fetchContacts,
  });

  const sendInvitationMutation = useMutation({
    mutationKey: ["send-invitation"],
    mutationFn: (payload: any) => SENDiNVITATION(payload),
    onSuccess: (res: any) => {
      console.log("on success", res);
    },
    onError: (err: any) => {
      console.error("on error", err);
    },
  });

  const handleInvitation = (info: any) => {
    console.log("information about chat", info);
    const payload = {
      email: info.contact_email,
      inviterName: info.contact_name,
    };
    sendInvitationMutation.mutate(payload);
  };

  useEffect(() => {
    console.log("userdata", data);
  }, [data]);

  const handleContactClick = async (item: any) => {
    try {
      const res = await getOrCreateChat(item.linked_user_id);
      if (res.success && res.chatId) {
        queryClient.invalidateQueries({ queryKey: ["update-list"] });
        navigate(`/chats/${res.chatId}`, {
          state: {
            display_name: item.contact_name,
            profile_icon: "",
            id: res.chatId,
            chat_id: res.chatId,
            other_user_id: item.linked_user_id,
          },
        });
      }
    } catch (error) {
      console.error("Error starting chat with contact:", error);
    }
  };

  return (
    <div className="contact-container">
      {data?.map((item: any, index: number) => {
        console.log("data in contacts", item);
        return (
          <div key={item.id || index} className="contact-list-container">
            <div className="avatar-name-container">
              <Avatar
                src={
                  item.profile_photo
                    ? `${API_CONFIG.BaseUrl}/${item.profile_photo}`
                    : undefined
                }
                addNeeded={false}
              />
              <div className="name-bio-container">
                <span>{item.contact_name}</span>
                <span>{item.bio || "hey"}</span>
              </div>
            </div>

            <div>
              {item.isRegistered == 1 ? (
                <div
                  className="msg-btn"
                  onClick={() => handleContactClick(item)}
                >
                  Message
                </div>
              ) : (
                <div
                  className="invite-btn"
                  onClick={() => handleInvitation(item)}
                >
                  Invite
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Contacts;
