import React, { useEffect, useState } from "react";
import Signup from "../signup";
import Switch from "../../../../common-component/switch/switch";
import Otpcontainer from "../../components/otp-container/otp-container";
import LockScreen from "../../components/locked-screen/lock-screen";

const SwitchSignupFlow = () => {
  const [screenName, setScreenName] = useState({
    name: "signup",
    data: {},
  });

  const handleScreen = (name, data) => {
    console.log("name", name, "adata", data);
    setScreenName({
      name,
      data,
    });
  };
  useEffect(() => {
    console.log("name", screenName.name, "data", screenName.data);
  }, [screenName]);
  return (
    <div className="switch-signup-flow-container">
      <Switch test={screenName.name}>
        <Signup value={"signup"} changeScreen={handleScreen} />
        <Otpcontainer
          value={"otp"}
          changeScreen={handleScreen}
          data={screenName.data}
        />
        <LockScreen timer={screenName.data} value={"lock-screen"} />
      </Switch>
    </div>
  );
};

export default SwitchSignupFlow;
