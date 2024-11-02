import styled from 'styled-components';

const StyledPlaylist = styled.footer`
    display: flex;
    flex-direction: row;
    
`;

const StyledSection = styled.section`
    flex: 1;
`
interface PlaylistProps {

}


const Playlist: React.FC<PlaylistProps> = (props) => {
    return (
        <StyledPlaylist>
            <StyledSection>First</StyledSection>
            <StyledSection>Second</StyledSection>
            <StyledSection>Third</StyledSection>
        </StyledPlaylist>
    );
};

export default Playlist;