import { useState } from "react";
import TextInput from "../../../common-component/inputs/text-input/text-input";
import "./login.scss";
import type { formState } from "../../shared/types/types";
import { useNavigate } from "react-router-dom";
import { validator } from "../../chat-module/constants/one-to-one";
import { useMutation } from "@tanstack/react-query";
import { handleLogin } from "./login-service/service";
import { getRemainingSeconds } from "../../../helpers/common-helpers";

interface loginProps {
  value: string;
  changeScreen: (name: string, data: any, type: string) => void;
}

const Login = ({ value, changeScreen }: loginProps) => {
  const [formData, setFormData] = useState<formState>({
    email: { value: "", isTouched: false, isValid: false, errorText: "" },
    passWord: { value: "", isTouched: false, isValid: false, errorText: "" },
  });

  const navigate = useNavigate();
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

  const handleLoginSubmit = useMutation({
    mutationKey: ["login"],

    mutationFn: async (data) => {
      console.log("mutation called");

      const res = await handleLogin(data);

      console.log("response", res);

      return res;
    },

    onSuccess: () => {
      changeScreen("otp", formData);
    },

    onError: (error) => {
      console.log("Full Error:", error);

      console.log("Error Message:", error?.message);

      console.log("Backend Error Data:", error?.response?.data);
      console.log(error?.response?.data?.message);
      console.log(
        "timer in seconds",
        getRemainingSeconds(error?.response?.data?.time_left),
      );
      if (error?.response?.data?.isLocked) {
        changeScreen(
          "lock-screen",
          {
            timer: getRemainingSeconds(error?.response?.data?.time_left),
            email: formData?.email?.value,
          },
          "wrong-pass",
        );
      }
    },
  });

  const handleSubmit = (e?: React.MouseEvent<HTMLImageElement>) => {
    e?.preventDefault();
    if (!isFormValid) return;

    const payload = {
      email: formData.email.value,
      password: formData.passWord.value,
    };
    console.log("paylaod", payload);

    handleLoginSubmit.mutate(payload);
  };

  return (
    <div className="login-container">
      <div className="login-header bold-text-medium">
        <span>Login</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="form-top-container">
          <TextInput
            label={"Email"}
            type={"email"}
            value={formData?.email.value}
            errorText={formData?.email.errorText}
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
        </div>
        <div className="bottom-container">
          <div className="signup-redirect bold-text-medium-xxs">
            <span onClick={() => navigate("/signup")}>
              Not having an Account? Click on Signup!!
            </span>
          </div>
          <div className="arrow-container">
            <button
              type="submit"
              disabled={!isFormValid || handleLoginSubmit.isPending}
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

export default Login;
