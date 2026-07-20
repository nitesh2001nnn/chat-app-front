import { useEffect, useState } from "react";
import Switch from "../../../common-component/switch/switch";
import EditPage from "../edit-page/edit-page";
import ProfilePage from "../profile-page";

const SwitchProfileScreen = () => {
  const [screenName, setScreenName] = useState({
    name: "profile-photo",
    data: {},
  });

  const handleScreen = (val: string) => {
    console.log("val is whag", val);
    setScreenName({ name: val, data: {} });
  };

  useEffect(() => {
    console.log("screenanme", screenName);
  }, [screenName]);

  return (
    <div className="profile-container">
      <Switch test={screenName.name}>
        <ProfilePage
          value={"profile-photo"}
          changeCB={(v: string) => handleScreen(v)}
        />
        <EditPage value={"edit-page"} changeCB={handleScreen} />
      </Switch>
    </div>
  );
};

export default SwitchProfileScreen;
