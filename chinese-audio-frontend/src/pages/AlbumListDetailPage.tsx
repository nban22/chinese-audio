import styled from 'styled-components';
import AlbumList from '../components/Album/AlbumList';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const StyledAlbumListDetailPage = styled.div`
    
`;

interface AlbumListDetailPageProps {

}

export interface AlbumAttributes {
    title: string;
    description: string;
    avatar: any;
    releaseDate: Date;
    isPublic: boolean;
}

export const loader = async () => {
    const response = await fetch('http://localhost:3001/api/v1/albums');
    const data = await response.json();
    return data;
}

const AlbumListDetailPage: React.FC<AlbumListDetailPageProps> = (props) => {
    const [albums, setAlbums] = useState<AlbumAttributes[]>([]);
    const data = useLoaderData() as AlbumAttributes[];
    console.log(data);

    return (
        <StyledAlbumListDetailPage>
            <AlbumList showAll={true} albumList={data}/>
        </StyledAlbumListDetailPage>
    );
};

export default AlbumListDetailPage;