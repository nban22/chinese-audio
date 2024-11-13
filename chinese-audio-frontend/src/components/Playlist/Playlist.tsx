import styled from 'styled-components';
import PlaylistHeader from './PlaylistHeader';
import PlaylistTable from './PlaylistTable/PlaylistTable';
import PlaylistControl from './PlaylistControl';
import { AlbumAttributes } from '../../services/albumService';

const StyledPlaylist = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledPlaylistContent = styled.div`
    padding: 20px;
`

interface PlaylistProps {
    albumDetail?: AlbumAttributes;
}


const Playlist: React.FC<PlaylistProps> = ({albumDetail, ...props}) => {
    return (
        <StyledPlaylist>
            <PlaylistHeader albumDetail={albumDetail} />
            <StyledPlaylistContent>
                <PlaylistControl />
                <PlaylistTable audios={albumDetail?.audios}/>
            </StyledPlaylistContent>
        </StyledPlaylist>
    );
};

export default Playlist;