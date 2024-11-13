import axios, { ResponseProps } from "../utils/axiosCustomize";
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
    const response = (await axios.get(`/api/v1/albums/${id}`)) as ResponseProps;
    response.isError = response.status !== 'success'
    return response;
};
