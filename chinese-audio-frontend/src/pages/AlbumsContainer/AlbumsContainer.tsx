import styled from "styled-components";
import AlbumList from "../../components/Album/AlbumList";

import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAlbumList } from "../../services/albumList";
import { AlbumListAttributes } from "../../services/albumListService";

const StyledAlbumsContainer = styled.div``;

interface AlbumsContainerProps {}

// export interface AlbumAttributes {
//     id: string;
//     title: string;
//     description: string;
//     avatar: any;
//     releaseDate: Date;
//     isPublic: boolean;
// }
// export interface AlbumListAttributes {
//     id:string;
//     title: string;
//     albums: AlbumAttributes[];
// }

export const albumListLoader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    return getAlbumList(id || '2');
};

const AlbumsContainer: React.FC<AlbumsContainerProps> = (props) => {
    const albumList = useLoaderData() as AlbumListAttributes;

    return (
        <StyledAlbumsContainer>
            <AlbumList showAll={true} albumList={albumList} />
        </StyledAlbumsContainer>
    );
};

export default AlbumsContainer;
