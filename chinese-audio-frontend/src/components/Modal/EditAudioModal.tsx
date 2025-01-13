import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import ModalLayout from "../admin/Modal/ModalLayout";
import HeaderModal from "../admin/Modal/HeaderModal";
import BodyModal from "../admin/Modal/BodyModal";
import InputFieldModal from "../admin/Modal/InputFieldModal";
import FooterModal from "../admin/Modal/FooterModal";
import ModalCloseButton from "../Button/ModalCloseButton";
import ModalSubmitButton from "../Button/ModalSubmitButton";
import TextareaFieldModal from "../admin/Modal/TextareaFieldModal";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import { putUpdateAudio } from "../../services/audioService";
import InputFileModal from "../admin/Modal/InputFileModal";

interface EditAudioModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  audio: any;
  onSuccess: () => Promise<void>;
}

const EditAudioModal: React.FC<EditAudioModalProps> = (props) => {
  const handleClose = () => props.setShow(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log("formData", Object.fromEntries(formData.entries()));

    setLoading(true);
    try {
      await putUpdateAudio(props.audio.id, formData);
    } catch (error: any) {
      toast.error(error.message || "Error in updating audio");
    }
  };

  return (
    <ModalLayout>
      <HeaderModal title="Edit Audio" onClose={handleClose} />

      <Form onSubmit={handleUpdate}>
        <BodyModal>
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="title"
              label="Title"
              placeholder="Enter title"
              name="title"
              defaultValue={props.audio.title}
              required
            />
          </div>
          <div className="col-span-12">
            <TextareaFieldModal
              id="description"
              label="Description"
              placeholder="Enter description"
              name="description"
              defaultValue={props.audio.description}
            />
          </div>
          <div className="col-span-12">
            <InputFileModal
              label="Audio File"
              id="audio"
              name="audio"
              accept="audio/*"
            />
          </div>
        </BodyModal>
        <FooterModal>
          <ModalCloseButton onClick={handleClose} />
          <ModalSubmitButton>Update</ModalSubmitButton>
        </FooterModal>
      </Form>
    </ModalLayout>
  );
};

export default EditAudioModal;
