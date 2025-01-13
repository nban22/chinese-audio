import { toast } from "react-toastify";
import { deleteAudio } from "../../services/audioService";
import BodyModal from "../admin/Modal/BodyModal";
import FooterModal from "../admin/Modal/FooterModal";
import HeaderModal from "../admin/Modal/HeaderModal";
import ModalLayout from "../admin/Modal/ModalLayout";
import ModalCloseButton from "../Button/ModalCloseButton";
import ModalSubmitButton from "../Button/ModalSubmitButton";
import { useState } from "react";
import { Form } from "react-router-dom";

interface DeleteAudioModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  audio: any;
  onSuccess: () => Promise<void>;
}

const DeleteAudioModal: React.FC<DeleteAudioModalProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const handleClose = () => props.setShow(false);
  const audio = props.audio;

  const handleDeleteAudio = async () => {
    setLoading(true);
    try {
      await deleteAudio(audio.id);
      await props.onSuccess();
      handleClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout>
      <HeaderModal title="Delete Confirmation" onClose={handleClose} />
      <Form onSubmit={handleDeleteAudio}>
        <BodyModal>
          <p className="col-span-12">
            Are you sure you want to delete the audio{" "}
            <strong className="text-gray-200">
              {audio.title || "this file"}
            </strong>
            ? This action cannot be undone.
          </p>
        </BodyModal>
        <FooterModal>
          <ModalCloseButton onClick={handleClose} />
          <ModalSubmitButton backgroundColor="danger">
            {loading ? "Deleting..." : "Delete"}
          </ModalSubmitButton>
        </FooterModal>
      </Form>
    </ModalLayout>
  );
};

export default DeleteAudioModal;
