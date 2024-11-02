import styled from "styled-components";
import "react-h5-audio-player/lib/styles.css";
import H5AudioPlayer from "react-h5-audio-player";
import audio from "../../assets/01_2_hsk2_workbook.mp3";

const StyledControlPlayer = styled.footer``;

const AudioPlayer = styled(H5AudioPlayer)`
    /* $rhap_background-color: red !important; */
    background-color: transparent;

    .rhap_button-clear {
        /* color: #861919; */
    }
    .rhap_play-pause-button {
        color: #fff;
        transition: all 100ms ease;
        &:hover,
        &:active {
            color: #ececec;
            transform: scale(1.05);
        }
    }
    .rhap_skip-button,
    .rhap_rewind-button,
    .rhap_forward-button,
    .rhap_volume-button,
    .rhap_repeat-button {
        transition: all 200ms ease;
        color: #868686;
        &:hover,
        &:active {
            color: #fff;
        }
    }
    .rhap_progress-filled {
        background-color: #fff;
    }
    .rhap_progress-bar:hover > .rhap_progress-filled,
    .rhap_progress-bar:active > .rhap_progress-filled {
        background-color: var(--primary-color);
    }
    .rhap_progress-indicator {
        transform: scale(0.5);
        background-color: #fff;
    }
    .rhap_progress-bar:hover > .rhap_progress-indicator,
    .rhap_progress-bar:active > .rhap_progress-indicator {
        background-color: #fff;
        transform: scale(1);
    }
    .rhap_download-progress {
        background-color: #868686;
    }
`;

interface ControlPlayerProps {}

const ControlPlayer: React.FC<ControlPlayerProps> = (props) => {
    return (
        <StyledControlPlayer>
            <AudioPlayer
            layout="stacked-reverse"
            volumeJumpStep={0.5}
                showFilledVolume={true}
                showSkipControls
                src={audio}
                onPlay={(e) => console.log("onPlay")}
            />
        </StyledControlPlayer>
    );
};

export default ControlPlayer;
