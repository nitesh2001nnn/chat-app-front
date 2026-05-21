import { useMutation } from '@tanstack/react-query';
import { ResendOtpApi } from '../common-service/service';

type resendOtpPayloadType = {
  email: string

}

type ChangeScreenType = (
  name: string,
  data: any
) => void;


const UseResendOtp = (changeScreen: ChangeScreenType) => {

  const resendOtpMutate = useMutation({
    mutationKey: ["resend-otp"],
    mutationFn: async (payload: resendOtpPayloadType) => await ResendOtpApi(payload),
    onSuccess: (_, variables) => {
      changeScreen("otp", {
        email: variables.email,
      });
    },
    onError: (err: any) => {
      console.error(err)
    }
  })


  return { resendOtpMutate }
}

export default UseResendOtp;
