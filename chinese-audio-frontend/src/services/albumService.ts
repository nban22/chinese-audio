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

export const getAllAlbums = async (): Promise<any> => {
    try {
        const data = await axiosCustom.get("api/v1/albums");
        return data; 
    } catch (error) {
        console.error("Error in getAllAlbums", error);
        throw error;
    }
}

export const deleteAlbumById = async (id: string): Promise<any> => {
    try {
        const data = await axiosCustom.delete(`api/v1/albums/${id}`);
        return data;
    } catch (error) {
        console.error("Error in deleteAlbumById", error);
        throw error;
    }
}