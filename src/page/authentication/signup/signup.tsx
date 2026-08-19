import { useState } from "react";
import TextInput from "../../../common-component/inputs/text-input/text-input";
import "./signup.scss";
import type { formState } from "../../shared/types/types";
import { validator } from "../../chat-module/constants/one-to-one";
import { handleSignup } from "./signup-service/service";
import { useMutation } from "@tanstack/react-query";

interface signupProps {
  value: string;
  changeScreen: (name: string, data: any) => void;
}

const Signup = ({ value, changeScreen }: signupProps) => {
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

  const isFormValid = Object.values(formData).every((itm: any) => itm.isValid);

  const handleSignupSubmit = useMutation({
    mutationKey: ["signup"],

    mutationFn: async (data) => {
      console.log("mutation called");

      const res = await handleSignup(data);

      console.log("response", res);

      return res;
    },

    onSuccess: () => {
      changeScreen("otp", formData);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e?: React.MouseEvent<HTMLImageElement>) => {
    e?.preventDefault();
    if (!isFormValid) return;

    const payload = {
      email: formData?.email?.value,
      phoneNumber: formData?.phoneNumber?.value,
      password: formData?.passWord?.value,
      fullName: formData?.fullName?.value,
    };
    console.log("paylaod", payload);

    handleSignupSubmit.mutate(payload);
  };

  console.log("isformValid", isFormValid);

  return (
    <div className="signup-container">
      <div className="signup-header bold-text-medium">
        <span>Signup</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="form-top-container">
          <TextInput
            value={formData.fullName.value}
            errorText={formData.fullName.errorText}
            placeholder={"Enter Your Name"}
            label={"Full Name"}
            onChange={(e: any) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
          />
          <TextInput
            label={"Email"}
            type={"email"}
            value={formData.email.value}
            errorText={formData.email.errorText}
            placeholder={"Enter an Email address"}
            onChange={(e: any) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          <TextInput
            type={"password"}
            value={formData.passWord.value}
            errorText={formData.passWord.errorText}
            placeholder={"Enter Password"}
            label={"Password"}
            onChange={(e: any) => handleChange("passWord", e.target.value)}
            onBlur={() => handleBlur("passWord")}
          />
          <TextInput
            type={"password"}
            value={formData.confPassword.value}
            errorText={formData.confPassword.errorText}
            placeholder={"Enter Confirm Password"}
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
            onChange={(e: any) =>
              handleChange("phoneNumber", e.target.value.replace(/\D/g, ""))
            }
            onBlur={() => handleBlur("phoneNumber")}
          />
        </div>

        <div className="bottom-container">
          <div className="arrow-container">
            <button
              type="submit"
              disabled={!isFormValid || handleSignupSubmit.isPending}
              className="arrow-btn"
            >
              <img src="/assets/icons/left-arrow.svg" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
