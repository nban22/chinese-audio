import styled from "styled-components";
import AlbumList from "../components/Album/AlbumList";
import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import { getAlbumList, getAlbumLists } from "../api/services/albumList";

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
    title: string;
    albums: AlbumAttributes[];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    return getAlbumList(id || "2");
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
