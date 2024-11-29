import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledAddNewAudioModal = styled(Modal)``;

interface AddNewAudioModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const AddNewAudioModal: React.FC<AddNewAudioModalProps> = ({ show, setShow }) => {
    const handleClose = () => setShow(false);

    return (
        <StyledAddNewAudioModal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create new audio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="inputTitle4" className="form-label">
                            Title
                        </label>
                        <input type="text" className="form-control" id="inputTitle4" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputFileName4" className="form-label">
                            File name
                        </label>
                        <input type="text" className="form-control" id="inputFileName4" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputDescription" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="inputDescription"
                            placeholder="Enter description here"
                        ></textarea>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="isPublic" className="form-label">
                            Is public
                        </label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="isPublic"
                                id="isPublicTrue"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="isPublicTrue">
                                true
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="isPublic"
                                id="isPublicFalse"
                                
                            />
                            <label className="form-check-label" htmlFor="isPublicFalse">
                                false
                            </label>
                        </div>
                    </div>
                    <div className="col-10">
                        <label htmlFor="inputURL" className="form-label">
                            URL
                        </label>
                        <input type="text" className="form-control" id="inputURL" disabled />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputDropboxPath" className="form-label">
                            Dropbox path
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputDropboxPath"
                            disabled
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputoriginalFileName" className="form-label">
                            Original file name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputoriginalFileName"
                            disabled
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputSize" className="form-label">
                            Size
                        </label>
                        <input type="text" className="form-control" id="inputSize" disabled />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </StyledAddNewAudioModal>
    );
};

export default AddNewAudioModal;
