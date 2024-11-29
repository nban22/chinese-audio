import axios from "../utils/axiosCustomize";

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

export const getAllAudios = async () => {
    const response = await axios.get('/api/v1/audios');    
    return response.data as {audios: AudioAttributes[], audios_total: number}; 
}