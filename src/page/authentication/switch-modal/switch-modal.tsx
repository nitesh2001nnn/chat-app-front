import { useRef, useState } from "react";
import Switch from "../../../common-component/switch/switch";
import EmailContainer from "../components/email-container/email-container";
import Otpcontainer from "../components/otp-container/otp-container";
import "./switch-modal.scss";

const SwitchModal = () => {
  const [screenInfo, setScreenInfo] = useState({
    value: "email",
    data: {},
  });

  const [toggleInfo, setToggleInfo] = useState("login");

  const handleChange = (name: string, data: Record<string, string>) => {
    console.log("name,data", name, data);
    setScreenInfo({
      value: name,
      data: data,
    });
  };

  const emailRef = useRef<any>(null);

  console.log("useRef", emailRef);
  const resetFunc = () => {
    setScreenInfo({
      value: "email",
      data: {},
    });
  };

  const handleToggle = (content: string) => {
    switch (content) {
      case "login":
        setToggleInfo("login");
        resetFunc();
        break;
      case "signup":
        setToggleInfo("signup");
        resetFunc();
        break;
      default:
        setToggleInfo("login");
        break;
    }
  };

  return (
    <div className="switch-modal-container">
      <div className="switch-modal-login">
        {screenInfo.value == "email" && (
          <div className="switch-btn-container">
            <button
              className={` ${
                toggleInfo == "login" ? "primary-button" : "secondary-button"
              }`}
              onClick={() => handleToggle("login")}
            >
              Login
            </button>
            <button
              className={` ${
                toggleInfo == "signup" ? "primary-button" : "secondary-button"
              }`}
              onClick={() => handleToggle("signup")}
            >
              Signup
            </button>
          </div>
        )}

        <div className="text-container text-body-normal">
          {toggleInfo == "login"
            ? "Welcome to login screen"
            : "Welcome to Signup screen"}
        </div>
      </div>
      <div className="grey-container text-heading-xxs">
        <span>You will get a code via email !!</span>
      </div>

      <div className="bottom-email-validator">
        <Switch test={screenInfo.value}>
          <EmailContainer changeScreen={handleChange} value={"email"} />
          <Otpcontainer value={"OTP"} changeScreen={handleChange} data={screenInfo.data} />
        </Switch>
      </div>
    </div>
  );
};

export default SwitchModal;
