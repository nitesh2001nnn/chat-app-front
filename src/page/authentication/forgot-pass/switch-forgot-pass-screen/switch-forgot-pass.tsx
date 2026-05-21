import { useState } from "react";
import "./switch-forgot.scss";
import ForgotPass from "../forgot-pass";
import Switch from "../../../../common-component/switch/switch";
import Otpcontainer from "../../components/otp-container/otp-container";

const SwitchForgotPass = () => {
  const [screenName, setScreenName] = useState({
    name: "forgotPass",
    data: {},
  });

  const handleScreen = (name: string, data: any) => {
    setScreenName({
      name,
      data,
    });
  };

  return (
    <Switch test={screenName.name}>
      <ForgotPass value={"forgotPass"} changeScreen={handleScreen} />
      <Otpcontainer value={"otp"} />
    </Switch>
  );
};

export default SwitchForgotPass;
