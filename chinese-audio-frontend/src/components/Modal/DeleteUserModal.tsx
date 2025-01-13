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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="mx-4 w-full max-w-md rounded-lg bg-gray-800 text-gray-100 shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-600 px-6 py-4">
          <h2 id="modal-title" className="text-lg font-bold">
            Edit Audio
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-300 focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4">
          <p>
            Are you sure you want to delete the user{" "}
            <strong className="text-gray-200">{0 || "this user"}</strong>? This
            action cannot be undone.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-4 border-t border-gray-600 px-6 py-4">
          <button
            onClick={handleClose}
            className="rounded-md bg-gray-700 px-4 py-2 text-gray-300 hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={handleClose}
            className="rounded-md bg-blue-500 px-4 py-2 text-gray-100 hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
