import { useEffect } from "react";
import UseTimer from "../../../../global/hooks/useTimer";
import "./otp-timer.scss";

interface otpTimerProps {
  timer: number;
  isExpiredDone: () => void;
}

const OtpTimer = ({ timer, isExpiredDone }: otpTimerProps) => {
  const { formattedTime, isExpired } = UseTimer(timer);

  useEffect(() => {
    if (isExpired) {
      isExpiredDone();
    }
  }, [isExpired]);

  return (
    <div className="timer-container bold-text-medium-xs">
      <span>{formattedTime}</span>
    </div>
  );
};

export default OtpTimer;
