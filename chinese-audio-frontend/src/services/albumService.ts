import axios, { ResponseProps } from "../utils/axiosCustomize";

export interface AlbumProps {
    id: string;
    title: string;
    description: string;
    avatar: string;
    releaseDate: Date;
    isPublic: true;
    createdAt: Date;
    updatedAt: Date;
    audios: [];
}



export const getAlbum = async (id: string) => {
    const response = (await axios.get("/api/v1/albums/" + id)) as ResponseProps;
    if (response.status === 'success') {
        response.isError = false;
    } else {
        response.isError = true;
    }
    return response;
};
