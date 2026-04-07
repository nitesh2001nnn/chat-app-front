import axios from "axios";
import { axiosInstance } from "../interceptor/interceptor"

import type { GetRequestType, PostRequestType } from "../model/common-model";

export const makePostRequest = ({
    endpoint,
    instance = true,
    payload,
    headers,
    successCb,
    errorCb,
    apiBaseUrl,
    isPutRequest = false
}: PostRequestType) => {
    const apiClient = instance ? axiosInstance : axios;

    const requestType = isPutRequest ? apiClient.put : apiClient.post;
    requestType(`${apiBaseUrl}${endpoint}`, payload || {}, {
        headers: headers || {}
    }).then((response) => {
        successCb(response);
    }).catch((err) => {
        errorCb(err)
    })

}


export const makeGetRequest = ({
    endpoint,
    apiBaseUrl,
    successCb,
    errorCb,
    instance = true,
    headers

}: GetRequestType) => {
    const apiClient = instance ? axiosInstance : axios;

    apiClient.get(`${apiBaseUrl}${endpoint}`, {
        headers: headers || {}
    }).then((response) => {
        successCb(response);
    }).catch((err) => {

        errorCb(err)
    })




}