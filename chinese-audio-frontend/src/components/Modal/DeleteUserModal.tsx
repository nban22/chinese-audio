import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledDeleteUserModal = styled(Modal)``;

interface DeleteUserModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ show, setShow }) => {
    const handleClose = () => setShow(false);

    return (
        <StyledDeleteUserModal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={true  }
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Audio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete the user{" "}
                    <strong>{0 || "this user"}</strong>? This action cannot be undone.
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
        </StyledDeleteUserModal>
    );
};

export default DeleteUserModal;
