import styled from "styled-components";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import EditAudioModal from "../../../Modal/EditAudioModal";
import DeleteAudioModal from "../../../Modal/DeleteAudioModal";

const StyledAudioActions = styled.div`
    display: flex;
    gap: 10px;
`;

interface AudioActionsProps {
    id: string;
}

const AudioActions: React.FC<AudioActionsProps> = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    
    return (
        <StyledAudioActions>
            <EditButton onClick={() => setShowEdit(true)} />
            <DeleteButton onClick={() => setShowDelete(true)} />

            <EditAudioModal show={showEdit} setShow={setShowEdit} />
            <DeleteAudioModal show={showDelete} setShow={setShowDelete} audioId={props.id}/>
        </StyledAudioActions>
    );
};

export default AudioActions;
