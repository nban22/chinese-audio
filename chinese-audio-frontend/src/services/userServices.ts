import axiosCustom from "../utils/axiosCustomize";


export const getUserList = async (): Promise<any> => {
    try {
        const data = await axiosCustom.get("/api/v1/users");
        return data;
    } catch (error) {
        throw error;
    }
}