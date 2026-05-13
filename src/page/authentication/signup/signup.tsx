import { useState } from "react";
import Checkbox from "../../../common-component/checkbox/checkbox";
import TextInput from "../../../common-component/inputs/text-input/text-input";
import "./signup.scss";
import type { formState } from "../../shared/types/types";
import { validator } from "../../chat-module/constants/one-to-one";

const Signup = () => {
  const [formData, setFormData] = useState<formState>({
    fullName: { value: "", isTouched: false, isValid: false, errorText: "" },
    email: { value: "", isTouched: false, isValid: false, errorText: "" },
    phoneNumber: { value: "", isTouched: false, isValid: false, errorText: "" },
    passWord: { value: "", isTouched: false, isValid: false, errorText: "" },
    confPassword: {
      value: "",
      isTouched: false,
      isValid: false,
      errorText: "",
    },
  });

  const validatorField = (
    field: keyof formState,
    value: string,
    updateFormData: formState,
  ) => {
    return validator[field](value, updateFormData);
  };

  const handleChange = (field: keyof formState, value: string) => {
    setFormData((prev) => {
      const updateValue = {
        ...prev,
        [field]: {
          ...prev[field],
          value: value,
        },
      };

      const error = prev[field]?.isTouched
        ? validatorField(field, value, updateValue)
        : "";

      return {
        ...updateValue,
        [field]: {
          ...updateValue[field],
          errorText: error,
          isValid: !error,
        },
      };
    });
  };

  const handleBlur = (field: keyof formState) => {
    setFormData((prev) => {
      const error = validatorField(field, prev[field].value, prev);
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
  return (
    <div className="signup-container">
      <div className="signup-header bold-text-medium">
        <span>Signup</span>
      </div>
      <form>
        <div className="form-top-container">
          <TextInput
            value={formData.fullName.value}
            errorText={formData.fullName.errorText}
            placeholder={"Enter Your Name"}
            label={"Full Name"}
            onChange={(e: any) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
          />
          <TextInput label={"Email"} type={"email"} />
          <TextInput
            value={formData.passWord.value}
            errorText={formData.passWord.errorText}
            placeholder={""}
            label={"Password"}
            onChange={(e: any) => handleChange("passWord", e.target.value)}
            onBlur={() => handleBlur("passWord")}
          />
          <TextInput
            value={formData.confPassword.value}
            errorText={formData.confPassword.errorText}
            placeholder={""}
            label={"Confirm Password"}
            onChange={(e: any) => handleChange("confPassword", e.target.value)}
            onBlur={() => handleBlur("confPassword")}
          />
          <TextInput
            value={formData.phoneNumber.value}
            errorText={formData.phoneNumber.errorText}
            placeholder={"+91*********9"}
            label={"Phone Number"}
            maxLength={10}
            onChange={(e: any) => handleChange("phoneNumber", e.target.value)}
            onBlur={() => handleBlur("phoneNumber")}
          />
        </div>

        <div className="bottom-container">
          <div className="arrow-container">
            <img
              src="/assets/icons/left-arrow.svg"
              // className={`${!isValid ? "disabled" : ""}`}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
