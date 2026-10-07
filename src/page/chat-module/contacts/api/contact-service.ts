import { API_CONFIG } from "../../../shared/api-config/api-config";
import { axiosInstance } from "../../../shared/interceptor/interceptor";

export const SENDiNVITATION = async (payload: any) => {
    const res = await axiosInstance.post(`${API_CONFIG.BaseUrl}${API_CONFIG.SEND_INVITATION}`, payload);
    return res.data
}