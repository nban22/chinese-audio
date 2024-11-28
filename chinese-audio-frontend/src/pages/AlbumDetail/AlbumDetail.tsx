import styled from "styled-components";
import Playlist from "../../components/Playlist/Playlist";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { AlbumAttributes, getAlbum } from "../../services/albumService";

const StyledAlbumDetail = styled.div``;

interface AlbumDetailProps {}

export const albumDetailLoader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    const albumDetail = await getAlbum(id!);
    return { albumDetail };
};

const AlbumDetail: React.FC<AlbumDetailProps> = (props) => {
    const { albumDetail } = useLoaderData() as { albumDetail: AlbumAttributes };
    return (
        <StyledAlbumDetail>
            <Playlist albumDetail={albumDetail} />
        </StyledAlbumDetail>
    );
};
export default AlbumDetail;
