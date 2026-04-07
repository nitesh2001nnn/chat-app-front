import { useNavigate } from "react-router-dom";
import { contacts } from "../constants/one-to-one";
import "./contact.scss"

const Contacts = () => {
    const navigate = useNavigate();
  return (
    <div className="contact-container">
        {
            contacts.map((item:any,index:number)=>{
                return(
                    <div className="contact-list-container" onClick={()=>navigate(`/chats/${item.id}`,{
                        state:item
                    })}>
                        <img src={item.profileIcon}/>
                        <span>{item.name}</span>
                    </div>
                )
            })
        }
        <h1>Contact</h1>
      
    </div>
  );
}

export default Contacts;
