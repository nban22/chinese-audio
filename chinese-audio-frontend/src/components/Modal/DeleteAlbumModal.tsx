// components/DeleteAlbumModal.tsx
import React, { FormEvent, useEffect } from "react";
import { Form } from "react-router-dom";
import ModalLayout from "../admin/Modal/ModalLayout";
import HeaderModal from "../admin/Modal/HeaderModal";
import BodyModal from "../admin/Modal/BodyModal";
import FooterModal from "../admin/Modal/FooterModal";
import ModalSubmitButton from "../Button/ModalSubmitButton";
import ModalCloseButton from "../Button/ModalCloseButton";
import { useDeleteAlbum } from "../../hooks/album/useDeleteAlbum";

interface DeleteAlbumModalProps {
  onClose: () => void;
  onSuccess: () => void;
  album: {
    id: string;
    title: string;
  };
}

const DeleteAlbumModal: React.FC<DeleteAlbumModalProps> = ({
  album,
  ...props
}) => {
  
  const handleClose = () => props.onClose();
  const { handleDelete, loading, error, success } = useDeleteAlbum();
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleDelete(album.id, props.onSuccess);
  };

  useEffect(() => {
    if (success) {
      props.onClose(); // Đóng modal khi xóa thành công
    }
  }, [success, props.onClose]);
  
  if (!album) return null;
  return (
    <ModalLayout>
      <HeaderModal title="Album Deletion" onClose={handleClose} />
      <Form onSubmit={handleSubmit}>
        <BodyModal>
          {error && <p className="text-red-500">{error}</p>}
          <p className="col-span-12">
            Are you sure you want to delete the album{" "}
            <strong className="text-gray-200">{album.title}</strong>? This
            action cannot be undone.
          </p>
        </BodyModal>
        <FooterModal>
          <ModalSubmitButton backgroundColor="danger" disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </ModalSubmitButton>
          <ModalCloseButton onClick={handleClose} disabled={loading}>
            Cancel
          </ModalCloseButton>
        </FooterModal>
      </Form>
    </ModalLayout>
  );
};

export default DeleteAlbumModal;