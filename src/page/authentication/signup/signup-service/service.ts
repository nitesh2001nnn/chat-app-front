import { API_CONFIG } from "../../../shared/api-config/api-config";

import axios from "axios";

export const handleSignup = async (payload: any) => {
    const res = await axios.post(`${API_CONFIG.BaseUrl}${API_CONFIG.SIGNUP}`, payload);
    console.log("res data", res)
    return res.data

}