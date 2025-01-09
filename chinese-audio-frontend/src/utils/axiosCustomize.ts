import axios, { AxiosResponse } from "axios";

const axiosCustom = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASEURL || "http://localhost:3001",
});

axiosCustom.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
)

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
                errorCode: response?.data?.errorCode || null,
                data: response?.data?.data || null,
            });
        } else if (response?.status >= 500) {
            return Promise.reject({
                type: "error",
                status: response?.status,
                errorCode: response?.data?.errorCode || null,
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
