import styled from 'styled-components';
import AlbumList from '../components/Album/AlbumList';

const StyledHomePage = styled.div`
    
`;

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = (props) => {
    return (
        <StyledHomePage>
            <AlbumList />
            <AlbumList />
            <AlbumList />
        </StyledHomePage>
    );
};

export default HomePage;