import styled from 'styled-components';
import AlbumList from '../components/Album/AlbumList';
import { getAllAlbumLists } from '../services/albumListService';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

const StyledHomePage = styled.div`
    
`;

interface HomePageProps {

}

export const albumListsLoader: LoaderFunction = async () => {
    const {albumLists} = await getAllAlbumLists();
    return { albumLists };
}

const HomePage: React.FC<HomePageProps> = (props) => {
    const {albumLists} = useLoaderData() as { albumLists: any[] };
    
    if (!albumLists) {
        return <div>Loading...</div>;
    }
    
    return (
        <StyledHomePage>
            {albumLists?.map((albumList) => (
                <AlbumList key={albumList.id} albumList={albumList} />
            ))}
        </StyledHomePage>
    );
};

export default HomePage;