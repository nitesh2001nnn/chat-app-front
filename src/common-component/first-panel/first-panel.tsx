import { useNavigate } from "react-router-dom";
import { firstPanelData } from "./constants/first-panel-constant";
import "./first-panel.scss";
import Avatar from "../avatar/avatar";
import { useGlobalContext } from "../../global/hooks/useGlobalContext";
import { getProfileImageUrl } from "../../page/shared/helper/helper";

interface FirstPanelProps {
  /** Optional custom profile image URL. If not provided, automatically fetched from the global context */
  profileImg?: string;
  /** Optional custom handler when the avatar is clicked */
  onProfileClick?: () => void;
  /** Optional active path to highlight currently active icon */
  activePath?: string;
}

const FirstPanel = ({
  profileImg,
  onProfileClick,
  activePath,
}: FirstPanelProps) => {
  const routeNavigate = useNavigate();
  // 1. Consume profile data directly from Global Context (single source of truth!)
  const { profileData } = useGlobalContext();

  // Resolve photo URL: custom prop if supplied, otherwise from global context
  const userProfile = Array.isArray(profileData?.data)
    ? profileData.data[0]
    : profileData?.data || profileData?.result?.[0] || profileData?.result;
  const fetchedPhoto = userProfile?.profile_photo || userProfile?.profilePhoto;
  const avatarUrl = profileImg || getProfileImageUrl(fetchedPhoto);

  const handleNavigate = (path: string) => {
    if (path) routeNavigate(path);
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      routeNavigate("/profile");
    }
  };

  return (
    <div className="first-panel-container">
      <div className="top-elements">
        {firstPanelData.map((item: any) => {
          return (
            <div
              key={item.id}
              className={`element-icon ${activePath === item.pathName ? "active" : ""}`}
              onClick={() => handleNavigate(item.pathName)}
            >
              <img src={item.img}  />
              <div>{item.label}</div>
            </div>
          );
        })}
      </div>

      <div className="lower-element">
        <div className="media-section">
          <img src="/assets/icons/gallery.png" alt="media" />
        </div>
        <div className="Avatar-section" onClick={handleProfileClick}>
          <Avatar src={avatarUrl} addNeeded={false} />
        </div>
      </div>
    </div>
  );
};

export default FirstPanel;
