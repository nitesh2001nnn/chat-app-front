export const ResendOtpApi =async(paylaod:any)=>{

    const res = await axios.post(`${API_CONFIG.BaseUrl}${API_CONFIG.RESEND_OTP}`, payload);
    return res.data;
}