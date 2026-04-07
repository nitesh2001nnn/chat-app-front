import { useEffect, useRef, useState } from "react";
import "./otp-container.scss";
import { makePostRequest } from "../../../shared/services/common-services";
import { API_CONFIG } from "../../../shared/api-config/api-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../auth-context";

interface otpProps {
  value: string;
  changeScreen: any;
  data: any;
}

const Otpcontainer = ({ changeScreen, data }: otpProps) => {
  console.log("data is waht", data);

  const shiftRef = useRef<any>([]);
  const [otpValue, setOtpValue] = useState({
    value: [],
    isTouched: "",
    isValid: false,
    error: "",
  });
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (val: any, index: number) => {
    const otpSet = [...otpValue.value];
    otpSet[index] = val;

    setOtpValue((Prev: any) => {
      return {
        ...Prev,
        value: otpSet,
      };
    });
    if (val && index < 6) {
      shiftRef?.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key == "Backspace") {
      if (otpValue.value[index] === "" && index > 0) {
        shiftRef?.current[index - 1].focus();
      }
    }
  };

  const isValid =
    otpValue.value.some((i) => i == "") || otpValue.value.length != 6
      ? false
      : true;

  const handleScreen = () => {
    makePostRequest({
      endpoint: API_CONFIG.VERIFY_OTP,
      apiBaseUrl: API_CONFIG.BaseUrl,
      payload: {
        email: data.email.value,
        otp: otpValue.value.join(""),
        phoneNumber: data.phoneNumber.value,
      },
      instance: false,

      successCb: (res: any) => {
        if (res.status == 200) {
          console.log("res", res);
          const userData = {
            token: res?.data?.token,
            userID: res?.data?.userID,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          setUser(res?.data?.userID);
          navigate("/chats");
        }
      },
      errorCb: (err: any) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    console.log("otp value", otpValue);
  }, [otpValue]);

  return (
    <div className="otp-container">
      <div className="otp-boxes">
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <input
              key={i}
              value={otpValue.value[i]}
              className="boxes"
              ref={(el: any) => (shiftRef.current[i] = el)}
              onChange={(e: any) => handleChange(e.target.value, i)}
              maxLength={1}
              onKeyDown={(e) => handleKeyDown(e, i)}
            ></input>
          );
        })}
      </div>
      <div className="arrow-container">
        <img
          src="/assets/icons/left-arrow.svg"
          className={`${!isValid ? "disabled" : ""}`}
          onClick={handleScreen}
        />
      </div>
    </div>
  );
};

export default Otpcontainer;
