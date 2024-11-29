import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledDeleteAlbumModal = styled(Modal)``;

interface DeleteAlbumModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const DeleteAlbumModal: React.FC<DeleteAlbumModalProps> = ({ show, setShow }) => {
    const handleClose = () => setShow(false);

    return (
        <StyledDeleteAlbumModal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Audio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete the album{" "}
                    <strong>{0 || "this album"}</strong>? This action cannot be undone.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </StyledDeleteAlbumModal>
    );
};

export default DeleteAlbumModal;
