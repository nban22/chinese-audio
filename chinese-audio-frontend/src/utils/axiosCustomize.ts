import axios, { AxiosResponse } from "axios";

// export interface ResponseProps {
//     isError: boolean;
//     status: string;
//     data?: any;
//     [key: string]: any;
// }

// interface JSendSuccess<T> {
//     status: "success";
//     data: T;
// }
// interface JSendFail {
//     status: "fail";
//     data: Record<string, unknown>;
// }

// interface JSendError {
//     status: "error";
//     message: string;
//     code?: number;
// }

// type JSendResponse<T> = JSendSuccess<T> | JSendFail | JSendError;

const axiosCustom = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASEURL || "http://localhost:3001",
});

axiosCustom.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response?.data?.data; 
    },
    (error) => {
        const { response } = error;
        const message = response?.data?.message || "Something went wrong";
        if (response?.status >= 400 && response?.status < 500) {
            return Promise.reject({
                type: "fail",
                status: response?.status,
                message,
                data: response?.data?.data || null,
            });
        } else if (response?.status >= 500) {
            return Promise.reject({
                type: "error",
                status: response?.status,
                message,
            });
        }

        // not defined error (e.g. network error)
        return Promise.reject({
            type: "http",
            message: error.message,
            response: error.response,
        });
    }
);

export default axiosCustom;
