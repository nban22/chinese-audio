import { AlbumAttributes } from "./albumService";

import axiosCustom from "../utils/axiosCustomize";
export interface AlbumListAttributes {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    albums: AlbumAttributes[];
}

export const getAllSeries = async (): Promise<any> => {
    try {
        const data = await axiosCustom.get("/api/v1/series");
        return data;
    } catch (error) {
        console.error("Error in getAllSeries", error);
        throw error;
    }
};

export const getSeriesById = async (id: string): Promise<any> => {
    try {
        const data = await axiosCustom.get(`/api/v1/series/${id}`);
        return data;
    } catch (error) {
        console.error("Error in getSeriesById", error);
        throw error;
    }
}
