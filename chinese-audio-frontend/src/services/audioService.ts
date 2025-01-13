import axiosCustom from "../utils/axiosCustomize";

export interface AudioAttributes {
    id: string;
    title: string;
    description?: string;
    playCount?: number;
    likeCount?: number;
    isPublic?: boolean;
    duration?: number;
    size: number;
    originalFileName: string;
    url: string;
    uploadDate?: Date;
}

export const getAllAudios = async (): Promise<any> => {
    try {
        const data = await axiosCustom.get("/api/v1/audios");
        return data
    } catch  (error) {
        throw error;
    }
}

export const deleteAudio = async (id: string): Promise<any> => {
    try {
        const data = await axiosCustom.delete(`/api/v1/audios/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const postUploadAudio = async (formData: FormData): Promise<any> => {
    const bodyData = {
        title: formData.get("title") || "",
        description: formData.get("description") || "",
        audio: formData.get("audio") || undefined,
    }
    try {
        const data = await axiosCustom.post("/api/v1/audios", bodyData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const getAudioById = async (id: string): Promise<any> => {
    try {
        const data = await axiosCustom.get(`/api/v1/audios/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const putUpdateAudio = async (id: string, formData: FormData): Promise<any> => {
    const bodyData = {
        title: formData.get("title") || "",
        description: formData.get("description") || "",
        audio: formData.get("audio") || undefined,
    }
    try {
        const data = await axiosCustom.put(`/api/v1/audios/${id}`, bodyData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}