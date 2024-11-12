import styled from 'styled-components';
import AlbumList from '../components/Album/AlbumList';
import { getAlbumLists } from '../services/albumList';
import { useLoaderData } from 'react-router-dom';

const StyledHomePage = styled.div`
    
`;

interface HomePageProps {

}

export const loader = async () => {
    const albumLists = await getAlbumLists();
    return { albumLists };
}

const HomePage: React.FC<HomePageProps> = (props) => {
    const {albumLists} = useLoaderData() as { albumLists: any[] };
    
    if (!albumLists) {
        return <div>Loading...</div>;
    }
    
    return (
        <StyledHomePage>
            {/* <AlbumList /> */}
            {/* <AlbumList /> */}
            {albumLists?.map((albumList) => (
                <AlbumList key={albumList.id} albumList={albumList} />
            ))}
        </StyledHomePage>
    );
};

export default HomePage;