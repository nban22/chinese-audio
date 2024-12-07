import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { deleteAudio } from "../../services/audioService";
import { Form } from "react-router-dom";

const StyledDeleteAudioModal = styled(Modal)``;

interface DeleteAudioModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    audioId: string;
}

const DeleteAudioModal: React.FC<DeleteAudioModalProps> = ({ show, setShow,...props }) => {
    const handleClose = () => setShow(false);

    const handleDeleteAudio = async () => {
        const data = await deleteAudio(props.audioId);
        if (data) {
            setShow(false);
        }
    }
    

    return (
        <StyledDeleteAudioModal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete the audio{" "}
                    <strong>{0 || "this file"}</strong>? This action cannot be undone.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Form action="destroy" method="POST">
                    <Button variant="primary" onClick={handleDeleteAudio}>
                        Delete
                    </Button>
                </Form>
            </Modal.Footer>
        </StyledDeleteAudioModal>
    );
};

export default DeleteAudioModal;
