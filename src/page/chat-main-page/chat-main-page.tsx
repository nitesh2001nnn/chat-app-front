import FirstPanel from "../../common-component/first-panel/first-panel";
import "./chat-main-page.scss";

import ChatWindow from "../chat-module/chat-window/chat-window";
import TopPanel from "../../common-component/top-panel/top-panel";
import { Outlet, useLocation } from "react-router-dom";
import LeftRightSlider from "../../common-component/left-right-slider/left-right-slider";
import { topBarMobileViewConstant } from "./constants/chat-main-page-constant";
import { useEffect, useState } from "react";
const ChatMainPage = () => {
  const { pathname } = useLocation();
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="mainpage-wrapper">
      <FirstPanel />
      <div className="main-page-container">
        <TopPanel pathName={pathname} />
        {mobileView && <LeftRightSlider data={topBarMobileViewConstant} />}
        <Outlet />
      </div>
      <ChatWindow />
    </div>
  );
};

export default ChatMainPage;
