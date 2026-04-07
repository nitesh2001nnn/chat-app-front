export type PostRequestType = {
    endPoint: string;
    instance?: boolean;
    payload?: object;
    headers?: object;
    successCb: (data: any) => void;
    errorCb: (err: any) => void;
    apiBaseUrl?: string;
    requestId?: string;
    isPutRequest?: boolean;

}

export type API_CONFIG_TYPE = {
    [key: string]: string;
}