import styled from 'styled-components';
import AlbumList from '../components/Album/AlbumList';

const StyledAlbumListDetailPage = styled.div`
    
`;

interface AlbumListDetailPageProps {

}

const AlbumListDetailPage: React.FC<AlbumListDetailPageProps> = (props) => {
    return (
        <StyledAlbumListDetailPage>
            <AlbumList showAll={true}/>
        </StyledAlbumListDetailPage>
    );
};

export default AlbumListDetailPage;