import styled from "styled-components";
import Playlist from "../components/Playlist/Playlist";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { AlbumAttributes, getAlbum } from "../services/albumService";

const StyledPlaylistPage = styled.div``;

interface PlaylistPageProps {}

export const albumDetailLoader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;    
    const res = await getAlbum(id!);
    const albumDetail = res.isError ? null : res.data.album as AlbumAttributes;   
    return { albumDetail };
};

const PlaylistPage: React.FC<PlaylistPageProps> = (props) => {
    const { albumDetail } = useLoaderData() as {albumDetail: AlbumAttributes};

    return (
        <StyledPlaylistPage>
            <Playlist albumDetail={albumDetail}/>
        </StyledPlaylistPage>
    );
};

export default PlaylistPage;
