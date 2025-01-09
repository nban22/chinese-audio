export const ERROR_CODES = {
    USER: {
        USER_NOT_FOUND: {
            code: "USER_4041",
            message: "User not found",
            statusCode: 404,
        },
        INVALID_EMAIL: {
            code: "USER_4001",
            message: "Invalid email format",
            statusCode: 400,
        },
        INCORRECT_PASSWORD: {
            code: "USER_4011",
            message: "Incorrect password",
            statusCode: 401,
        },
        MISSING_CREDENTIALS: {
            code: "USER_4003",
            message: "Please provide email and password",
            statusCode: 400,
        },
        USER_ALREADY_EXISTS: {
            code: "USER_4002",
            message: "User already exists",
            statusCode: 400,
        },
        INVALID_TOKEN: {
            code: "USER_4011",
            message: "Invalid token! Please log in to get access",
            statusCode: 401,
        },
        NOT_LOGGED_IN: {
            code: "USER_4012",
            message: "You are not logged in! Please log in to get access",
            statusCode: 401,
        },
        PERMISSION_DENIED: {
            code: "USER_4031",
            message: "You do not have permission to perform this action",
            statusCode: 403,
        },
        JWT_EXPIRED: {
            code: "USER_4013",
            message: "JWT has expired",
            statusCode: 401,
        },
    },
    AUDIO: {
        AUDIO_NOT_FOUND: {
            code: "AUDIO_4041",
            message: "Audio not found",
            statusCode: 404,
        },
        INVALID_AUDIO_FORMAT: {
            code: "AUDIO_4001",
            message: "Invalid audio format",
            statusCode: 400,
        },
        AUDIO_PROCESSING_ERROR: {
            code: "AUDIO_5001",
            message: "Error processing audio",
            statusCode: 500,
        },
    },
    GENERAL: {
        INTERNAL_SERVER_ERROR: {
            code: "GEN_5001",
            message: "An unexpected error occurred",
            statusCode: 500,
        },
        JWT_SECRET_NOT_DEFINED: {
            code: "GEN_4002",
            message: "JWT_SECRET is not defined in env file",
            statusCode: 400,
        },
    },
};
