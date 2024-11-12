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

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASEURL,
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        // Do something before request is sent
        return config;
    },
    function (error: AxiosError) {
        // Do something with request error
        console.log(error.request);
        console.log("Error", error.message);
        console.log(error.config);
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    (error: AxiosError) => {
        
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log(error.response?.data);
        // console.log(error.response?.status);
        // console.log(error.response?.headers);
        // console.log("Error", error.message);
        // console.log(error.config);
        // console.log({error});
        
        return error.response?.data;
        // return Promise.reject(error);
    }
);

export default instance;
