import React, { useState } from "react";
import InputFieldModal from "../admin/Modal/InputFieldModal";
import { postUploadAudio } from "../../services/audioService";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import BodyModal from "../admin/Modal/BodyModal";
import FooterModal from "../admin/Modal/FooterModal";
import ModalCloseButton from "../Button/ModalCloseButton";
import ModalSubmitButton from "../Button/ModalSubmitButton";
import HeaderModal from "../admin/Modal/HeaderModal";
import ModalLayout from "../admin/Modal/ModalLayout";
import InputFileModal from "../admin/Modal/InputFileModal";

interface ModalAddNewAudioProps {
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

const ModalAddNewAudio: React.FC<ModalAddNewAudioProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    props.onClose();
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted");
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("formData", Object.fromEntries(formData.entries()));

    try {
      await postUploadAudio(formData);
      handleClose();
      props.onSuccess();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout>
      <HeaderModal title="Add New Audio" onClose={handleClose} />
      <Form onSubmit={handleSubmitForm}>
        <BodyModal>
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="title"
              label="Title"
              placeholder="Enter title"
              name="title"
              required={true}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="description"
              label="Description"
              placeholder="Enter description"
              name="description"
              required={false}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
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
          <ModalSubmitButton>
            {loading ? (
              <span className="animate-spin">Loading...</span>
            ) : (
              "Upload Audio"
            )}
          </ModalSubmitButton>
        </FooterModal>
      </Form>
    </ModalLayout>
  );
};

export default ModalAddNewAudio;
