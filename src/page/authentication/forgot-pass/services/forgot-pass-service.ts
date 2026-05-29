import axios from "axios"
import { API_CONFIG } from "../../../shared/api-config/api-config"

export const PassWordResetToken = async (payload: any) => {
    const res = await axios.post(`${API_CONFIG.BaseUrl}${API_CONFIG.PASSWORD_GEN_TOKEN}`, payload);
    return res;
}

export const PasswordResetApi = async (payload: any) => {
    const res = await axios.post(`${API_CONFIG.BaseUrl}${API_CONFIG.PASSWORD_RESET}`, payload);
    return res;

}