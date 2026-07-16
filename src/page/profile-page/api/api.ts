
import { API_CONFIG } from "../../shared/api-config/api-config"
import { axiosInstance } from "../../shared/interceptor/interceptor";

export const ProfilePhotoUpload = async (payload: any) => {
    const res = await axiosInstance.post(`${API_CONFIG.BaseUrl}${API_CONFIG.UPLOAD_PHOTO}`, payload);
    return res.data

}