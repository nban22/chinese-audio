import styled from "styled-components";
import IconPlayCircle from "../../icons/IconPlayCircle";
import IconPauseCircle from "../../icons/IconPauseCircle";
import { useState } from "react";
import IconArrowShuffle from "../../icons/IconArrowShuffle";
import IconSearch from "../../icons/IconSearch";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

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
        <div className="flex justify-between items-center p-5">
            <div className="flex items-center gap-5">
                <button className="bg-primary p-3 rounded-full hover:transform hover:scale-105 hover:brightness-150">
                    {isPlaying ? (
                        <PlayIcon className="h-8 w-8 text-black" onClick={handlePlayPause}/>
                    ) : (
                        <PauseIcon className="h-8 w-8 text-black" onClick={handlePlayPause}/>
                    )}
                </button>
                <button className="text-white">
                    <PlusCircleIcon className="h-8 w-8" />
                </button>
            </div>

            <div>
                <button className="text-zinc-300 flex items-center gap-1 hover:text-white">
                    <span>List</span> <ListBulletIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default PlaylistControl;
