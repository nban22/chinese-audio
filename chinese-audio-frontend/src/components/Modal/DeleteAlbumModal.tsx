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

const DeleteAlbumModal: React.FC<DeleteAlbumModalProps> = ({
  show,
  setShow,
  ...props
}) => {
  const album = props.album;
  if (!album) {
    return null;
  }

  const handleClose = () => setShow(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="mx-4 w-full max-w-md rounded-lg bg-gray-800 text-gray-100 shadow-lg">
        {/* Form Container */}
        <form action={`${album.id}/delete`} method="POST">
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-gray-600 px-6 py-4">
            <h2 id="modal-title" className="text-lg font-bold">
              Album Deletion
            </h2>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-400 hover:text-gray-300 focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-4">
            <p>
              Are you sure you want to delete the album{" "}
              <strong className="text-gray-200">
                {album?.title || "this album"}
              </strong>
              ? This action cannot be undone.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-4 border-t border-gray-600 px-6 py-4">
            <button
              onClick={handleClose}
              type="button"
              className="rounded-md bg-gray-700 px-4 py-2 text-gray-300 hover:bg-gray-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-gray-100 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAlbumModal;
