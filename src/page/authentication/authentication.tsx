import { useEffect, useRef, useState } from "react";
import Checkbox from "../../common-component/checkbox/checkbox";
import EmailInputs from "../../common-component/inputs/email-inputs/email-inputs";
import "./authrntication.scss";
import SwitchModal from "./switch-modal/switch-modal";
import EmailContainer from "./components/email-container/email-container";
import Otpcontainer from "./components/otp-container/otp-container";
import Switch from "../../common-component/switch/switch";

const Authentication = () => {
  const [email, setEmail] = useState({
    value: "",
    isTouched: false,
    isValid: false,
    error: "",
    remember: false,
  });

  const [screenInfo, setScreenInfo] = useState({
    name: "email",
    data: {},
  });

  const handleChange = (name, data) => {
    console.log("name,data", name, data);
    setScreenInfo({
      name: name,
      data: data,
    });
  };

  const emailRef = useRef<any>(null);

  console.log("useRef", emailRef);

  // const handleChange = (value: any, error: any) => {
  //   const isEmailTouched = email.isTouched;
  //   setEmail((prev: any) => {
  //     return {
  //       ...prev,
  //       value: value,
  //       error: isEmailTouched ? error : "",
  //       isValid: !error,
  //     };
  //   });
  // };

  const handleTouched = () => {
    setEmail((prev: any) => {
      return {
        ...prev,
        isTouched: true,
      };
    });
  };

  useEffect(() => {
    console.log("name of screen", screenInfo);
  }, [screenInfo]);

  return (
    <div className="authentication-container">
      <div className="authentication-previewer">
        <SwitchModal />
        {/* <div className="bottom-email-validator">
          <span>You will get a code via email !!</span>
          <Switch test={screenInfo.name}>
            <EmailContainer
              ref={emailRef}
              changeScreen={handleChange}
              value={"email"}
            />
            <Otpcontainer value={"OTP"} />
          </Switch>
        </div> */}
      </div>
    </div>
  );
};

export default Authentication;
