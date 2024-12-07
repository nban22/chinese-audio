import axiosCustom from "../utils/axiosCustomize";

export interface AudioAttributes {
    id?: string;
    title: string;
    description: string;
    playCount?: number;
    likeCount?: number;
    isPublic?: boolean;
    duration?: number;
    fileName: string;
    size: number;
    originalFileName: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
    dropboxPath?: string;
}

export const getAllAudios = async (): Promise<any> => {
    try {
        const data = await axiosCustom.get("/api/v1/audios");
        return data
    } catch  (error) {
        console.error("Error in getAllAudios", error);
        throw error;
    }
}

export const deleteAudio = async (id: string): Promise<any> => {
    try {
        const data = await axiosCustom.delete(`/api/v1/audios/${id}`);
        return data;
    } catch (error) {
        console.error("Error in deleteAudio", error);
        throw error;
    }
}