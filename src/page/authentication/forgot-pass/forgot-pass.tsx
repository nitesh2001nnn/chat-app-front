import { useState } from "react";
import "./forgot-pass.scss";
import { validator } from "../../chat-module/constants/one-to-one";
import type { formState } from "../../shared/types/types";
import TextInput from "../../../common-component/inputs/text-input/text-input";

interface ForgotPassProps {
  value: string;
  changeScreen: (name: string, data: any) => void;
}

const ForgotPass = ({ value, changeScreen }: ForgotPassProps) => {
  const [formData, setFormData] = useState({
    email: { value: "", isTouched: false, errorText: "", isValid: false },
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
      const error = validatorField(field, value, prev);

      return {
        ...prev,
        [field]: {
          ...prev[field],
          value,
          errorText: prev[field].isTouched ? error : "",
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

  const isValid = Object.values(formData).every(
    (field) => field.isValid && field.value.trim() !== "",
  );

  return (
    <div className="forgot-pass-container">
      <div className="forgot-header bold-text-medium">
        <span>Forgot Password</span>
      </div>
      <div className="email-checker">
        <span className="text-body email-check-text">
          Successfully !!
          <div className="text-body email-check-text">
            Password Change request has to be sent , Please check email!!
          </div>
        </span>
      </div>
      <form>
        <div className="form-top-container">
          <TextInput
            value={formData.email.value}
            errorText={formData.email.errorText}
            placeholder={"Enter Your Email"}
            label={"Email"}
            onBlur={() => handleBlur("email")}
            onChange={(e: any) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="btn-container n">
          <button className={`primary-button ${!isValid ? "disabled" : ""} `}>
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
