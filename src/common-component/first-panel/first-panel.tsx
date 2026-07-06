import { useNavigate } from "react-router-dom";
import { firstPanelData } from "./constants/first-panel-constant";
import "./first-panel.scss";
import Avatar from "../avatar/avatar";

const FirstPanel = () => {
  const routeNavigate = useNavigate();

  const handleNavigate = (path: string) => {
    routeNavigate(path);
  };
  return (
    <div className="first-panel-container">
      <div className="top-elements">
        {firstPanelData.map((item: any, index: any) => {
          return (
            <div
              className="element-icon"
              onClick={() => handleNavigate(item.pathName)}
            >
              <img src={item.img}></img>
              <div>{item.label}</div>
            </div>
          );
        })}
      </div>

      <div className="lower-element">
        <div className="media-section">
          <img src="assets/icons/gallery.png" />
        </div>
        <div
          className="Avatar-section"
          onClick={() => routeNavigate("/profile")}
        >
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default FirstPanel;
