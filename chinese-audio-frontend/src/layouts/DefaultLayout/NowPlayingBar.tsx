import styled from "styled-components";
import "react-h5-audio-player/lib/styles.css";
import H5AudioPlayer from "react-h5-audio-player";
import audio from "../../assets/01_2_hsk2_workbook.mp3";

const AudioPlayer = styled(H5AudioPlayer)`
  background-color: transparent;
  box-shadow: none;
  padding: 0;

  .rhap_controls-section {
    margin: 0;
  }

  /* .rhap_button-clear {
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
    } */
`;

interface NowPlayingBarProps {}

const NowPlayingBar: React.FC<NowPlayingBarProps> = (props) => {
  return (
    <footer className="flex h-[72px] items-center">
      <div className="mx-auto w-5/6 sm:w-1/2 lg:w-1/3">
        <AudioPlayer
          layout="stacked-reverse"
          volumeJumpStep={0.5}
          showFilledVolume={true}
          showSkipControls
          src={audio}
          onPlay={(e) => console.log("onPlay")}
        />
      </div>
    </footer>
  );
};

export default NowPlayingBar;
