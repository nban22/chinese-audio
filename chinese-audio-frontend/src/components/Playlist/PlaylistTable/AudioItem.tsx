import styled from "styled-components";
import { AudioAttributes } from "../../../services/audioService";

const StyledAudioItem = styled.tr`
    &:hover {
        background-color: #66666647;
    }
    td {
        font-size: 0.9rem;
        padding-block: 0.5rem;
        padding-right: 1rem;
        text-align: left;
    }
    td:nth-child(1) {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        width: 40px;
        text-align: right;
    }
    td:nth-last-child(1) {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: right;
    }
`;

interface AudioItemProps {
    audio?: AudioAttributes;
    index: number;
}

const AudioItem: React.FC<AudioItemProps> = ({audio, index, ...props}) => {
    return (
        <StyledAudioItem>
            <td>{index}</td>
            <td>{audio?.title}</td>
            <td>None</td>
            <td>{(new Date(audio?.createdAt!)).toISOString()}</td>
            <td>3:21</td>
        </StyledAudioItem>
    );
};

export default AudioItem;
