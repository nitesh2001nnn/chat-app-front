import FirstPanel from "../../common-component/first-panel/first-panel";
import "./chat-main-page.scss";

import ChatWindow from "../chat-module/chat-window/chat-window";
import TopPanel from "../../common-component/top-panel/top-panel";
import { Outlet, useLocation } from "react-router-dom";
const ChatMainPage = () => {
  const { pathname } = useLocation();
  return (
    <div className="mainpage-wrapper">
      <FirstPanel />
      <div className="main-page-container">
        <TopPanel pathName={pathname} />
        <Outlet />
      </div>
      <ChatWindow />
    </div>
  );
};

export default ChatMainPage;
