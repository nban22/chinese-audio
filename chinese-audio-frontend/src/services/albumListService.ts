import { AlbumAttributes } from "./albumService";

import axios from "../utils/axiosCustomize";
export interface AlbumListAttributes {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    albums: AlbumAttributes[];
}


export const getAllAlbumLists = async () => {
    const response = await axios.get('/api/v1/album-lists');
    console.log(response.data);
    return response.data as {albumLists: AlbumAttributes[]}; 
}