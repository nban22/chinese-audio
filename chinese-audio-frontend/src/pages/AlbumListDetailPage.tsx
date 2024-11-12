import styled from "styled-components";
import AlbumList from "../components/Album/AlbumList";

import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAlbumList } from "../services/albumList";

const StyledAlbumListDetailPage = styled.div``;

interface AlbumListDetailPageProps {}

export interface AlbumAttributes {
    id: string;
    title: string;
    description: string;
    avatar: any;
    releaseDate: Date;
    isPublic: boolean;
}
export interface AlbumListAttributes {
    id:string;
    title: string;
    albums: AlbumAttributes[];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    return getAlbumList(id || '2');
};

const AlbumListDetailPage: React.FC<AlbumListDetailPageProps> = (props) => {
    const albumList = useLoaderData() as AlbumListAttributes        ;
    if (!albumList) {
        return <div>Loading...</div>;
    }

    return (
        <StyledAlbumListDetailPage>
            <AlbumList showAll={true} albumList={albumList} />
        </StyledAlbumListDetailPage>
    );
};

export default AlbumListDetailPage;
