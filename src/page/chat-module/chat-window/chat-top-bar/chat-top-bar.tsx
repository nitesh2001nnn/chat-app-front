import "./chat-top-bar.scss";
import Avatar from "../../../../common-component/avatar/avatar";

type chatTopBarProps = {
  name:string;
  profile_icon:string;
}

const ChatTopBar = ({name,profile_icon}:chatTopBarProps) => {
  return (
    <div className="chat-top-bar-window">
      <div className="avatar-name-container">
        <Avatar src={profile_icon}/>
        <div className="name-container">
          <span className="bold-text-medium-xs">{name}</span>
          <span>Last seen</span>
        </div>
      </div>
      <div className="right-side-container">
        <img src="/assets/icons/video.svg" />
        <img src="/assets/icons/Phone.svg" />
        <img src="/assets/icons/Menu_Dots.svg" />
      </div>
    </div>
  );
};

export default ChatTopBar;
