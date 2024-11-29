import styled from "styled-components";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";

const StyledAudioActions = styled.div`
    display: flex;
    gap: 10px;
`;

interface AudioActionsProps {
    id: string;
}

const AudioActions: React.FC<AudioActionsProps> = (props) => {
    return (
        <StyledAudioActions>
            <EditButton />
            <DeleteButton />
        </StyledAudioActions>
    );
};

export default AudioActions;
