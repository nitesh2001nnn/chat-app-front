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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updateField = {
        ...prev,
        [field]: {
          ...prev[field],
          value: value,
        },
      };

      const error = prev[field]?.isTouched
        ? validatorField(field, value, prev)
        : "";

      return {
        ...updateField,
        [field]: {
          errorText: error,
          isValid: !error,
        },
      };
    });
  };
  return (
    <div className="forgot-pass-container">
      <div className="forgot-header bold-text-medium">
        <span>Forgot Password</span>
      </div>
      <form>
        <div className="form-top-container">
          <TextInput
            value={formData.email.value}
            errorText={formData.email.errorText}
            placeholder={"Enter Your Email"}
            label={"Email"}
            onChange={(e: any) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="btn-container primary-button">
          <button>Forgot Password</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
