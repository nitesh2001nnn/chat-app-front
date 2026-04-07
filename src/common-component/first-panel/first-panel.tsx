import { useNavigate } from "react-router-dom";
import { firstPanelData } from "./constants/first-panel-constant";
import "./first-panel.scss";

const FirstPanel = () => {
  const routeNavigate = useNavigate();

  const handleNavigate=(path:string)=>{
    routeNavigate(path)
  }
  return (
    <div className="first-panel-container">
      {firstPanelData.map((item: any, index: any) => {
        return (
          <div className="element-icon" onClick={()=>handleNavigate(item.pathName)}>
            <img src={item.img}></img>
            <div>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FirstPanel;
