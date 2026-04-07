import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import Checkbox from "../../../../common-component/checkbox/checkbox";
import "./email-container.scss";
import TextInput from "../../../../common-component/inputs/text-input/text-input";
import { validator } from "../../../chat-module/constants/one-to-one";
import type { formState } from "../../../shared/types/types";
import { makePostRequest } from "../../../shared/services/common-services";
import { API_CONFIG } from "../../../shared/api-config/api-config";

interface emailContainer {
  value: string;
  changeScreen: any;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmailContainer = ({ value: _, changeScreen }: emailContainer) => {
  const [formData, setFormData] = useState<formState>({
    fullName: { value: "", isTouched: false, isValid: false, errorText: "" },
    email: { value: "", isTouched: false, isValid: false, errorText: "" },
    phoneNumber: { value: "", isTouched: false, isValid: false, errorText: "" },
  });
  const [remembered, setRemembered] = useState(false);

  const handleChange = (field: keyof formState, value: string) => {
    setFormData((prev) => {
      const error = prev[field].isTouched ? validator[field](value) : "";
      return {
        ...prev,
        [field]: {
          ...prev[field],
          errorText: error,
          value: value,
          isValid: !error,
        },
      };
    });
  };

  const handleBlur = (field: keyof formState) => {
    setFormData((prev) => {
      const error = validator[field](prev[field].value);
      return {
        ...prev,
        [field]: {
          ...prev[field],
          isTouched: true,
          errorText: error,
          isValid: !error,
        },
      };
    });
  };
  // const [email, setEmail] = useState({
  //   value: "",
  //   isTouched: false,
  //   isValid: false,
  //   error: "",
  //   remember: false,
  // });

  // const[phoneNumber,setPhoneNumber]=useState({
  //   value:"",
  //   isTouched:false,
  //   isValid:false,
  //   error:"",
  // })

  const emailRemember = useRef<any>(null);

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
  //   setPhoneNumber((prev:any)=>{
  //     return(
  //       {
  //         ...prev,
  //         value:value,

  //       }
  //     )
  //   })
  // };

  // const handleTouched = () => {
  //   setEmail((prev: any) => {
  //     return {
  //       ...prev,
  //       isTouched: true,
  //     };
  //   });
  // };

  const handleCheck = () => {
    setRemembered(!remembered);
  };

  const handleScreen = (name: string) => {
    makePostRequest({
      endpoint: API_CONFIG.LOGIN,
      apiBaseUrl: API_CONFIG.BaseUrl,
      payload: { email: formData.email.value },
      instance: false,
      successCb: (res: any) => {
        console.log("res", res);
        if (res.status == 200) {
          changeScreen(name, formData);
        }
      },
      errorCb: (err: any) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="email-container" ref={emailRemember}>
      <TextInput
        label={"Email"}
        value={formData.email.value}
        onChange={(e: any) => handleChange("email", e.target.value)}
        errorText={formData.email.errorText}
        placeholder={"Enter Email"}
        onBlur={() => handleBlur("email")}
        type={"email"}
      />

      <TextInput
        label={"Phonenumber"}
        value={formData.phoneNumber.value}
        onChange={(e: any) => handleChange("phoneNumber", e.target.value)}
        errorText={formData.phoneNumber.errorText}
        placeholder={"Enter Phone Number"}
        onBlur={() => handleBlur("phoneNumber")}
      />
      <div className="bottom-container">
        <Checkbox
          label={"Remember Me"}
          classes={remembered ? "active" : ""}
          onCheck={handleCheck}
        />
        <div className="arrow-container">
          <img
            src="/assets/icons/left-arrow.svg"
            // className={`${!isValid ? "disabled" : ""}`}
            onClick={() => handleScreen("OTP")}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailContainer;
