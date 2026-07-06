import { useNavigate } from "react-router-dom";
import "./contact.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchContacts, getOrCreateChat } from "../add-contacts/api/add-contact-services";
import { useEffect } from "react";

const Contacts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["fetch-contact"],
    queryFn: fetchContacts,
  });

  useEffect(() => {
    console.log("userdata", data);
  }, [data]);

  const handleContactClick = async (item: any) => {
    if (!item.linked_user_id) {
      alert("This contact is not a registered user on Chat App yet.");
      return;
    }
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
          <div
            key={item.id || index}
            className="contact-list-container"
            onClick={() => handleContactClick(item)}
          >
            <img src={item.profileIcon} />
            <span>{item.contact_name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Contacts;

