import axiosCustom from "../utils/axiosCustomize";

export const postSignup = async (email: string, password: string, username: string): Promise<any> => {
    try {
        const data = await axiosCustom.post("/api/v1/auth/signup", { email, password, username });
        return data;
    } catch (error) {
        console.error("Error in postSignup", error);
        throw error;
    }
}

export const postLogin = async (email: string, password: string): Promise<any> => {
    try {
        const data = await axiosCustom.post("/api/v1/auth/login", { email, password });
        return data;
    } catch (error) {
        console.error("Error in postLogin", error);
        throw error;
    }
}

export const getMe = async (): Promise<any> => {
    try {
        const data = await axiosCustom.get("/api/v1/auth/me");
        return data;
    } catch (error) {
        console.error("Error in getMe", error);
        throw error;
    }
}