import { useState } from "react";
import OtpTimer from "../../../shared/component/otp-timer/otp-timer";
import "./lock-screen.scss";
import UseResendOtp from "../../hooks/useResendOtp";
interface lockScreenProps {
  data: { timer: number; email: string };
  value: string;
  type?: string;
  changeScreen: (name: string, data: any) => void;
}

const LockScreen = ({ data, type, changeScreen }: lockScreenProps) => {
  const [isExpired, setIsExpired] = useState(false);
  const changeScreenTask = (name: string, data: any) => {
    changeScreen(name, data);
  };
  const { resendOtpMutate } = UseResendOtp(changeScreenTask);

  const handleRetry = () => {
    switch (type) {
      case "login-otp-value":
        resendOtpMutate.mutate({ email: data.email });

        break;
      case "wrong-pass":
        changeScreen("login", {});
        break;
      default:
        return;
    }
  };

  return (
    <div className="lock-screen-container">
      <span className="text-body-xs failed-text">
        Too Many Attempt's are done,Lock until for 5 Min's
      </span>
      {data.timer &&
        (isExpired ? (
          <button className="secondary-button" onClick={handleRetry}>
            Retry
          </button>
        ) : (
          <OtpTimer
            timer={data.timer}
            isExpiredDone={() => setIsExpired(true)}
          />
        ))}
    </div>
  );
};

export default LockScreen;
