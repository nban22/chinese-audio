import { AlbumAttributes } from "./albumService";

import axiosCustom from "../utils/axiosCustomize";
export interface AlbumListAttributes {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    albums: AlbumAttributes[];
}

export const getAllAlbumLists = async (): Promise<any> => {
    try {
        const data = await axiosCustom.get("/api/v1/album-lists");
        return data;
    } catch (error) {
        console.error("Error in getAllAlbumLists", error);
        throw error;
    }
};
