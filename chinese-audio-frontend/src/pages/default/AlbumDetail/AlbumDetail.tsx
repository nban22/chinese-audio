import styled from "styled-components";
import Playlist from "../../../components/Playlist/Playlist";
import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { AlbumAttributes, getAlbum } from "../../../services/albumService";
import { toast } from "react-toastify";

const StyledAlbumDetail = styled.div``;

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
        <StyledAlbumDetail>
            <Playlist albumDetail={albumDetail} />
        </StyledAlbumDetail>
    );
};
export default AlbumDetail;
