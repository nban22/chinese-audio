import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledEditUserModal = styled(Modal)``;

interface EditUserModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="mx-4 w-full max-w-4xl rounded-lg bg-gray-800 text-gray-100 shadow-lg">
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
          <form className="grid grid-cols-12 gap-4">
            {/* Title */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="inputTitle4"
                className="block text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="inputTitle4"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* File Name */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="inputFileName4"
                className="block text-sm font-medium text-gray-300"
              >
                File Name
              </label>
              <input
                type="text"
                id="inputFileName4"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="col-span-12">
              <label
                htmlFor="inputDescription"
                className="block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="inputDescription"
                placeholder="Enter description here"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Is Public */}
            <div className="col-span-12 md:col-span-2">
              <label
                htmlFor="isPublic"
                className="block text-sm font-medium text-gray-300"
              >
                Is Public
              </label>
              <div className="mt-1 flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isPublic"
                    id="isPublicTrue"
                    className="border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-300">True</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isPublic"
                    id="isPublicFalse"
                    className="border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-300">False</span>
                </label>
              </div>
            </div>

            {/* URL */}
            <div className="col-span-12 md:col-span-10">
              <label
                htmlFor="inputURL"
                className="block text-sm font-medium text-gray-300"
              >
                URL
              </label>
              <input
                type="text"
                id="inputURL"
                disabled
                className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm"
              />
            </div>

            {/* Dropbox Path */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="inputDropboxPath"
                className="block text-sm font-medium text-gray-300"
              >
                Dropbox Path
              </label>
              <input
                type="text"
                id="inputDropboxPath"
                disabled
                className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm"
              />
            </div>

            {/* Original File Name */}
            <div className="col-span-12 md:col-span-4">
              <label
                htmlFor="inputoriginalFileName"
                className="block text-sm font-medium text-gray-300"
              >
                Original File Name
              </label>
              <input
                type="text"
                id="inputoriginalFileName"
                disabled
                className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm"
              />
            </div>

            {/* Size */}
            <div className="col-span-12 md:col-span-2">
              <label
                htmlFor="inputSize"
                className="block text-sm font-medium text-gray-300"
              >
                Size
              </label>
              <input
                type="text"
                id="inputSize"
                disabled
                className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm"
              />
            </div>
          </form>
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

export default EditUserModal;
