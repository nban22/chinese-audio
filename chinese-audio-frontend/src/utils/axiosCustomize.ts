import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
    ResponseType,
} from "axios";

export interface ResponseProps {
    isError: boolean;
    status: string;
    data?: any;
    [key: string]: any;
}

interface JSendSuccess<T> {
    status: "success";
    data: T;
}
interface JSendFail {
    status: "fail";
    data: Record<string, unknown>;
}

interface JSendError {
    status: "error";
    message: string;
    code?: number;
}

type JSendResponse<T> = JSendSuccess<T> | JSendFail | JSendError;

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASEURL,
});

instance.interceptors.response.use(
    (response: AxiosResponse<JSendSuccess<any>, any>) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const data = response.data;
        if (data.status === "success") {
            return {
                ...response,
                data: data.data, // Return the `data` part of the JSend response
            };
        } else {
            return Promise.reject({
                ...response,
                message: "🚀🚀🚀 With 2xx statusCode, status must be set 'success'!!!!!!",
            });
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
