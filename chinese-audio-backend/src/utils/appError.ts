class AppError extends Error {
    declare status: string;
    declare statusCode: number;
    declare errorCode: string;

    constructor(
        messageOrOptions: string | { message: string; statusCode: number; code?: string },
        statusCode?: number,
        errorCode?: string
    ) {
        if (typeof messageOrOptions === "string") {
            // Constructor with individual parameters
            super(messageOrOptions);
            this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
            this.statusCode = statusCode!;
            this.errorCode = errorCode || "0";
        } else {
            // Constructor with an object parameter
            super(messageOrOptions.message);
            this.status = `${messageOrOptions.statusCode}`.startsWith("4") ? "fail" : "error";
            this.statusCode = messageOrOptions.statusCode;
            this.errorCode = messageOrOptions.code || "0";
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
