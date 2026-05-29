import { useEffect, useMemo, useState } from "react";
import TextInput from "../../../../common-component/inputs/text-input/text-input";
import { validator } from "../../../chat-module/constants/one-to-one";
import type { formState } from "../../../shared/types/types";
import "./password-reset.scss";
import { useMutation } from "@tanstack/react-query";
import {
  PasswordResetApi,
  PassWordResetToken,
} from "../services/forgot-pass-service";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  useEffect(() => {
    console.log("params", params);
  }, [params]);

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

  const passwordChangeReset = useMutation({
    mutationKey: ["password-reset"],
    mutationFn: PasswordResetApi,
    onSuccess: (res: any) => {
      console.log("res after success hit in pass reset screen", res);
      if (res.data.isResetDone == true) {
        navigate("/login");
      }
    },
    onError: (err: any) => {
      console.error("error in gen pass", err);
    },
  });

  const payload = useMemo(
    () => ({
      password: formData && formData?.passWord.value,
      token,
    }),
    [formData.passWord],
  );

  const handleGeneratePassword = (e: any) => {
    e.preventDefault();
    passwordChangeReset.mutate(payload);
  };

  return (
    <div className="reset-container">
      <div className="reset-header">
        <span>Reset Password</span>
      </div>
      <form onSubmit={(e: any) => handleGeneratePassword(e)}>
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
          <button
            className={`primary-button ${!isValid ? "disabled" : ""} `}
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
