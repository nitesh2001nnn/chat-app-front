import { useState } from "react";
import TextInput from "../../../../common-component/inputs/text-input/text-input";
import { validator } from "../../../chat-module/constants/one-to-one";
import type { formState } from "../../../shared/types/types";
import "./password-reset.scss";

const PasswordReset = () => {
  const [formData, setFormData] = useState<formState>({
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
      const updatedForm = {
        ...prev,
        [field]: {
          ...prev[field],
          value,
        },
      };

      // current field validation
      const currentError = validatorField(field, value, updatedForm);

      updatedForm[field] = {
        ...updatedForm[field],
        errorText: prev[field].isTouched ? currentError : "",
        isValid: !currentError,
      };

      // revalidate confirm password when password changes
      if (field === "passWord") {
        const confError = validatorField(
          "confPassword",
          updatedForm.confPassword.value,
          updatedForm,
        );

        updatedForm.confPassword = {
          ...updatedForm.confPassword,
          errorText: updatedForm.confPassword.isTouched ? confError : "",
          isValid: !confError,
        };
      }

      return updatedForm;
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
          isValid: !error,
        },
      };
    });
  };

  const isValid = Object.values(formData).every(
    (itx: any) => itx.isValid && itx.value.trim() !== "",
  );
  return (
    <div className="reset-container">
      <div className="reset-header">
        <span>Reset Password</span>
      </div>
      <form>
        <div className="form-top-container">
          <TextInput
            label={"New Password"}
            placeholder={"Enter New Password"}
            value={formData.passWord.value}
            errorText={formData.passWord.errorText}
            onBlur={() => handleBlur("passWord")}
            onChange={(e: any) =>
              handleChange("passWord", e.target.value.trim())
            }
          />
          <TextInput
            label={"Confirm Password"}
            errorText={formData.confPassword.errorText}
            value={formData.confPassword.value}
            placeholder={"Enter Confirm Password"}
            onBlur={() => handleBlur("confPassword")}
            onChange={(e: any) =>
              handleChange("confPassword", e.target.value.trim())
            }
          />
        </div>
        <div className="btn-container">
          <button className={`primary-button ${!isValid ? "disabled" : ""} `}>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
