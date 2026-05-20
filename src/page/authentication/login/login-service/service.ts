

import axios from "axios";
import { API_CONFIG } from "../../../shared/api-config/api-config";

export const handleLogin = async (payload: any) => {
    const res = await axios.post(`${API_CONFIG.BaseUrl}${API_CONFIG.LOGIN}`, payload);
    console.log("res data", res)
    return res.data

}