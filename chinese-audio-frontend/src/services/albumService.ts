// import axios, { ResponseProps } from "../utils/axiosCustomize";
import axiosCustom from "../utils/axiosCustomize";
import { AudioAttributes } from "./audioService";

export interface AlbumAttributes {
    id: string;
    title: string;
    description: string;
    avatar: string;
    releaseDate: Date;
    isPublic: true;
    createdAt: Date;
    updatedAt: Date;
    audios: AudioAttributes[];
}

export const getAlbum = async (id: string) => {
    try {
        const data = await axiosCustom.get(`api/v1/albums/${id}`);
        return data;
    } catch (error) {
        console.error("Error in getAlbum", error);
        throw error;
    }
};
