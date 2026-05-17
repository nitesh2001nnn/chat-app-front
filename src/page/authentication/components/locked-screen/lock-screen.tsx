import { useState } from "react";
import OtpTimer from "../../../shared/component/otp-timer/otp-timer";
import "./lock-screen.scss";
interface lockScreenProps {
  timer: number;
  retry?: () => void;
  value: string;
}

const LockScreen = ({ timer, retry, value }: lockScreenProps) => {
  const [isExpired, setIsExpired] = useState(false);

  return (
    <div className="lock-screen-container">
      <span className="text-body-xs failed-text">
        Too Many Attempt's are done,Lock until for 5 Min's
      </span>
      {timer &&
        (isExpired ? (
          <button className="secondary-button" onClick={retry}>
            Retry
          </button>
        ) : (
          <OtpTimer timer={timer} isExpiredDone={() => setIsExpired(true)} />
        ))}
    </div>
  );
};

export default LockScreen;
