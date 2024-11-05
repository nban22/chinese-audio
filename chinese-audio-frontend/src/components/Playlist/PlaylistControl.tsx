import styled from "styled-components";
import IconPlayCircle from "../../icons/IconPlayCircle";
import IconPauseCircle from "../../icons/IconPauseCircle";
import { useState } from "react";
import IconArrowShuffle from "../../icons/IconArrowShuffle";
import IconSearch from "../../icons/IconSearch";

const StyledPlaylistControl = styled.div`
    display: flex;
    justify-content: space-between;

    .play-pause {
        color: var(--primary-color, #2d50ed);
        transition: all 100ms ease;
        cursor: pointer;
        &:hover {
            filter: brightness(1.1);
            transform: scale(1.05);
        }
    }
`;

const WrapperLeftside = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const WrapperRightside = styled.div`
    display: flex;
    align-items: center;

    #form-serch-inside-playlist {
        display: flex;
        align-items: center;
        gap: 10px;

        input[type="search"] {
            border: none;
            background-color: #bbbbbb58;
            height: 30px;
            outline: none;
            border-radius: 5px;
            padding: 2px 10px;
            color: #fff;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            width: 150px;
        }
        
    }
    
`;

interface PlaylistControlProps {}

const PlaylistControl: React.FC<PlaylistControlProps> = (props) => {
    const [isPlaying, setPlaying] = useState(true);

    const handlePlayPause = (e: React.MouseEvent) => {
        setPlaying((pre) => !pre);
    };

    return (
        <StyledPlaylistControl>
            <WrapperLeftside>
                {isPlaying ? (
                    <IconPlayCircle size={60} onClick={handlePlayPause} className="play-pause" />
                ) : (
                    <IconPauseCircle size={60} onClick={handlePlayPause} className="play-pause" />
                )}
                <IconArrowShuffle size={30} />
            </WrapperLeftside>

            <WrapperRightside>
                <form action="#" method="get" id="form-serch-inside-playlist">
                    <input type="search" name="searchInsidePlaylist" id="q" />
                    <label htmlFor="q" style={{display: 'flex'}}>
                        <IconSearch size={26} />
                    </label>
                    <span>Search</span>
                </form>
            </WrapperRightside>
        </StyledPlaylistControl>
    );
};

export default PlaylistControl;
