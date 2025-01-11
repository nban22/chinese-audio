import Playlist from "../../../components/Playlist/Playlist";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import {  getAlbum } from "../../../services/albumService";
import { toast } from "react-toastify";

interface AlbumDetailProps {}

export const albumDetailLoader: LoaderFunction = async ({ params }) => {
    try {
        const data = await getAlbum(params.id as string);
        return { data };
    } catch (error: any) {
        console.error("Error in albumDetailLoader", error);
        toast.error(error.message || "An error occurred");
        return { data: null };
    }
};

const AlbumDetail: React.FC<AlbumDetailProps> = (props) => {
    const { data } = useLoaderData() as { data: any };

    if (!data) {
        return <div>Loading...</div>;
    }

    const albumDetail = data.album || {};
    return (
        <div className="h-full w-full overflow-auto custom-scrollbar">
            <Playlist albumDetail={albumDetail} />
        </div>
    );
};
export default AlbumDetail;
