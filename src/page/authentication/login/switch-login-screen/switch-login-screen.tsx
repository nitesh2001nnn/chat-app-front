import { useEffect, useState } from "react";
import Switch from "../../../../common-component/switch/switch";
import Otpcontainer from "../../components/otp-container/otp-container";
import Login from "../login";
import "./switch-login-screen.scss";
import LockScreen from "../../components/locked-screen/lock-screen";

const SwitchLoginScreen = () => {
  const [screenName, setScreenName] = useState({
    name: "login",
    data: {},
    type: "",
  });

  const handleScreen = (name: string, data: any, type?: string) => {
    setScreenName({
      name,
      data,
      type,
    });
  };

  useEffect(() => {
    console.log("screenname of login", screenName);
  }, [screenName]);
  return (
    <Switch test={screenName.name}>
      <Login value={"login"} changeScreen={handleScreen} />
      <Otpcontainer
        value={"otp"}
        changeScreen={handleScreen}
        data={screenName.data}
      />
      <LockScreen
        data={{
          timer: screenName.data.timer,
          email: screenName.data.email,
        }}
        value={"lock-screen"}
        type={screenName.type}
        changeScreen={handleScreen}
      />
    </Switch>
  );
};

export default SwitchLoginScreen;
