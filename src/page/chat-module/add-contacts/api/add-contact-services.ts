import { API_CONFIG } from "../../../shared/api-config/api-config"
import { axiosInstance } from "../../../shared/interceptor/interceptor"

export const fetchContacts = async () => {
    const res = await axiosInstance.get(`${API_CONFIG.BaseUrl}${API_CONFIG.FETCH_CONTACTS}`);
    return res.data.data
}

export const AddContact = async (payload: any) => {
    const res = await axiosInstance.post(`${API_CONFIG.BaseUrl}${API_CONFIG.ADD_CONTACT}`, payload);
    return res.data
}