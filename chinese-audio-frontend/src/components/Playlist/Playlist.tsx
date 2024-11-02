import styled from 'styled-components';
import PlaylistHeader from './PlaylistHeader';

const StyledPlaylist = styled.div`
    display: flex;
    flex-direction: row;
`;




interface PlaylistProps {

}


const Playlist: React.FC<PlaylistProps> = (props) => {
    return (
        <StyledPlaylist>
            <PlaylistHeader />
            
        </StyledPlaylist>
    );
};

export default Playlist;