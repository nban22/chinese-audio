import styled from "styled-components";
import IconBxSkipPrevious from "../../icons/IconBxSkipPrevious";
import IconPlayerTrackPrev from "../../icons/IconPlayerTrackPrev";
import IconPlayCircle from "../../icons/IconPlayCircle";
import IconPlayerTrackNext from "../../icons/IconPlayerTrackNext";
import IconBxSkipNext from "../../icons/IconBxSkipNext";
import ProgressBar from "./ProgressBar";

const StyledPlayerControl = styled.section``;

const ControlContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > *:nth-child(1),
    & > *:nth-last-child(1) {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .left-control {
        justify-content: flex-end;
    }
    .center-control {
        justify-content: center;
        &>button {
            color: #fff;
            transition: transform 50ms linear;
        }
        &>button:hover, &>button:active {
            transform: scale(1.05);
        }
    }
    .right-control {
        justify-content: flex-start;
    }
    .right-control, .left-control {
        min-width: calc(44px * 4);
    }
`;

const StyledButton = styled.button`
    background-color: transparent;
    color: #dcdcdc9c;
    border: none;
    cursor: pointer;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 44px;
    padding: 0;
    margin: 0 5px;
    transition: color 50ms linear;
    &:hover, &:active {
        color: #ffffff;
    }
`;

interface PlayerControlProps {}

const PlayerControl: React.FC<PlayerControlProps> = (props) => {
    return (
        <StyledPlayerControl>
            <ControlContainer>
                <div className="left-control">
                    <StyledButton>
                        <IconBxSkipPrevious size={32} />
                    </StyledButton>
                    <StyledButton>
                        <IconPlayerTrackPrev size={25} />
                    </StyledButton>
                </div>
                <div className="center-control">
                    <StyledButton>
                        <IconPlayCircle size={38} />
                    </StyledButton>
                </div>
                <div className="right-control">
                    <StyledButton>
                        <IconPlayerTrackNext size={25} />
                    </StyledButton>
                    <StyledButton>
                        <IconBxSkipNext size={32} />
                    </StyledButton>
                </div>
            </ControlContainer>
            <ProgressBar totalDuration={200} />
        </StyledPlayerControl>
    );
};

export default PlayerControl;
