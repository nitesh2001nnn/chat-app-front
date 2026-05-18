import { useMutation } from '@tanstack/react-query';
import { ResendOtpApi } from '../common-service/service';

type resendOtpPayloadType = {
  email: string
}


const UseResendOtp = () => {

  const resendOtpMutate = useMutation({
    mutationKey: ["resend-otp"],
    mutationFn: async (payload: resendOtpPayloadType) => await ResendOtpApi(payload),

  })


  return { resendOtpMutate }
}

export default UseResendOtp;
