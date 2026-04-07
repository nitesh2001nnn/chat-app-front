export type GetRequestType = {
    apiBaseUrl?: string;
    endpoint: string;
    instance?: boolean;
    headers?: object;
    requestId?: string;
    successCb: (data: any) => void;
    errorCb: (err: any) => void;
}

export type PostRequestType = {
    apiBaseUrl?: string;
    endpoint: string;
    instance?: boolean;
    payload?: object;
    headers?: object;
    requestId?: string;
    successCb: (data: any) => void;
    errorCb: (err: any) => void;
    isPutRequest?: boolean;
}

export type API_CONFIG_TYPE = {
    [key: string]: string;
}

