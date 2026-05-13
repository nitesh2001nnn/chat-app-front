import { useNavigate } from "react-router-dom";
import { contacts } from "../constants/one-to-one";
import "./contact.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchContacts } from "../add-contacts/api/add-contact-services";
import { useEffect } from "react";

const Contacts = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["fetch-contact"],
    queryFn: fetchContacts,
  });

  useEffect(() => {
    console.log("userdata", data);
  }, [data]);
  return (
    <div className="contact-container">
      {data?.map((item: any, index: number) => {
        return (
          <div
            className="contact-list-container"
            onClick={() =>
              navigate(`/chats/${item.id}`, {
                state: item,
              })
            }
          >
            <img src={item.profileIcon} />
            <span>{item.contact_name}</span>
          </div>
        );
      })}
      <h1>Contact</h1>
    </div>
  );
};

export default Contacts;
