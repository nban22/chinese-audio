import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { deleteAlbumById } from "../../services/albumService";
import { toast } from "react-toastify";
import { ActionFunction, Form, redirect, useNavigate } from "react-router-dom";

const StyledDeleteAlbumModal = styled(Modal)``;

interface DeleteAlbumModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    album: any;
}

export const albumDeletionAction: ActionFunction = async ({ params }) => {
    try {
        const data = await deleteAlbumById(params.id as string);
        redirect("/admin/management/album");
        return { data };
    } catch (error: any) {
        console.error("Error in albumDeletionAction", error);
        toast.error(error.message || "An error occurred");
        return { data: null };
    }
};

const DeleteAlbumModal: React.FC<DeleteAlbumModalProps> = ({ show, setShow, ...props }) => {
    const album = props.album;
    if (!album) {
        return null;
    }

    const handleClose = () => setShow(false);

    return (
        <StyledDeleteAlbumModal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
            <Form action={`${album.id}/delete`} method="POST">
                <Modal.Header closeButton>
                    <Modal.Title>Album Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete the album{" "}
                        <strong>{album?.title || "this album"}</strong>? This action cannot be
                        undone.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit">
                        Delete
                    </Button>
                </Modal.Footer>
            </Form>
        </StyledDeleteAlbumModal>
    );
};

export default DeleteAlbumModal;
