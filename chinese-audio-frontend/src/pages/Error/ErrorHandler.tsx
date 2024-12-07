import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { toast } from "react-toastify";

const ErrorHandler = () => {
    const error = useRouteError() as any;

    useEffect(() => {
        if (error) {
            // Hiển thị thông báo lỗi
            toast.error(error.message || "An unexpected error occurred");
        }
    }, [error]);

    return null; // Không render gì cả, giữ nguyên layout
};

export default ErrorHandler;
