import styled from 'styled-components';
import Playlist from '../components/Playlist/Playlist';

const StyledAlbumDetailPage = styled.div`
    
`;

interface AlbumDetailPageProps {

}

const AlbumDetailPage: React.FC<AlbumDetailPageProps> = (props) => {
    return (
        <StyledAlbumDetailPage>
            <Playlist />
        </StyledAlbumDetailPage>
    );
};

export default AlbumDetailPage;