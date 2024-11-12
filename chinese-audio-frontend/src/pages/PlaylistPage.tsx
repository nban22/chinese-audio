import styled from "styled-components";
import Playlist from "../components/Playlist/Playlist";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { AlbumProps, getAlbum } from "../services/albumService";

const StyledPlaylistPage = styled.div``;

interface PlaylistPageProps {}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;    
    const res = await getAlbum(id!);
    const albumDetail = res.isError ? null : res.data.album as AlbumProps;
    
    return { albumDetail };
};

const PlaylistPage: React.FC<PlaylistPageProps> = (props) => {
    const { albumDetail } = useLoaderData() as {albumDetail: AlbumProps};
    
    return (
        <StyledPlaylistPage>
            <Playlist albumDetail={albumDetail}/>
        </StyledPlaylistPage>
    );
};

export default PlaylistPage;
