import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledDeleteAudioModal = styled(Modal)``;

interface DeleteAudioModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const DeleteAudioModal: React.FC<DeleteAudioModalProps> = ({ show, setShow }) => {
    const handleClose = () => setShow(false);

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
                <Button variant="primary" onClick={handleClose}>
                    Delete
                </Button>
            </Modal.Footer>
        </StyledDeleteAudioModal>
    );
};

export default DeleteAudioModal;
