import styled from 'styled-components';
import PlaylistHeader from './PlaylistHeader';
import PlaylistTable from './PlaylistTable/PlaylistTable';
import PlaylistControl from './PlaylistControl';

const StyledPlaylist = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledPlaylistContent = styled.div`
    padding: 20px;
`

interface PlaylistProps {

}


const Playlist: React.FC<PlaylistProps> = (props) => {
    return (
        <StyledPlaylist>
            <PlaylistHeader />
            <StyledPlaylistContent>
                <PlaylistControl />
                <PlaylistTable />
            </StyledPlaylistContent>
        </StyledPlaylist>
    );
};

export default Playlist;