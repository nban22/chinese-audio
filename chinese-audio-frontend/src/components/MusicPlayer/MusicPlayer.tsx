import styled from "styled-components";
import PlayerControl from "./PlayerControl";

const StyledMusicPlayer = styled.footer`
    display: flex;
    flex-direction: row;
    height: 70px;
    &>* {
        flex: 1;
    }
`;

const StyledSection = styled.section`
    
`;

interface MusicPlayerProps {}

const MusicPlayer: React.FC<MusicPlayerProps> = (props) => {

    return (
        <StyledMusicPlayer>
            
            <StyledSection>First</StyledSection>
            <PlayerControl>Second</PlayerControl>
            <StyledSection>Third</StyledSection>
        </StyledMusicPlayer>
    );
};

export default MusicPlayer;
