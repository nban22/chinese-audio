import React, { useState } from "react";
import InputFieldModal from "../admin/Modal/InputFieldModal";
import { postCreateAlbum } from "../../services/albumService";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import BodyModal from "../admin/Modal/BodyModal";
import FooterModal from "../admin/Modal/FooterModal";
import ModalCloseButton from "../Button/ModalCloseButton";
import ModalSubmitButton from "../Button/ModalSubmitButton";
import HeaderModal from "../admin/Modal/HeaderModal";
import ModalLayout from "../admin/Modal/ModalLayout";
import InputFileModal from "../admin/Modal/InputFileModal";

interface ModalAddNewAlbumProps {
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

interface FormDataState {
  title: string;
  description: string;
  avatar?: File | null;
  releaseDate: string | null;
  isPublic: boolean;
}

const ModalAddNewAlbum: React.FC<ModalAddNewAlbumProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    description: "",
    avatar: null,
    releaseDate: null,
    isPublic: false,
  });
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null); // For image preview

  const handleClose = () => {
    // Reset form data when closing
    setFormData({
      title: "",
      description: "",
      avatar: null,
      releaseDate: null,
      isPublic: false,
    });
    setPreviewAvatar(null); // Clear preview
    props.onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file, // Store the file object for upload
      }));
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreviewAvatar(previewUrl);

      // Clean up any previous blob URL to prevent memory leaks
      if (previewAvatar && previewAvatar.startsWith("blob:")) {
        URL.revokeObjectURL(previewAvatar);
      }
    }
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: null, // Clear the avatar
    }));
    setPreviewAvatar(null); // Clear the preview
    // Clean up any blob URL if it exists
    if (previewAvatar && previewAvatar.startsWith("blob:")) {
      URL.revokeObjectURL(previewAvatar);
    }
  };

  const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isPublic: e.target.value === "true",
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append form fields to FormData
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description || "");
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar); // Append the file
    }
    if (formData.releaseDate) {
      formDataToSend.append("releaseDate", formData.releaseDate);
    }
    formDataToSend.append("isPublic", formData.isPublic.toString());

    try {
      await postCreateAlbum(formDataToSend);
      handleClose();
      await props.onSuccess();
    } catch (error: any) {
      toast.error(error.message || "An error occurred while creating the album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout>
      <HeaderModal title="Create Album" onClose={handleClose} />
      <Form onSubmit={handleSubmitForm}>
        <BodyModal>
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="title"
              label="Title"
              placeholder="Enter title"
              name="title"
              required={true}
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="description"
              label="Description"
              placeholder="Enter description"
              name="description"
              required={false}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-gray-300">Avatar</label>
            {previewAvatar && (
              <div className="mt-2">
                <img
                  src={previewAvatar}
                  alt="Avatar Preview"
                  className="h-20 w-20 object-cover rounded-md border border-gray-600"
                />
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={loading}
              className="mt-2"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-gray-300">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate || ""}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-gray-300">Public Status</label>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isPublic"
                  value="true"
                  checked={formData.isPublic === true}
                  onChange={handlePublicChange}
                  disabled={loading}
                  className="form-radio"
                />
                <span className="ml-2">Public</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isPublic"
                  value="false"
                  checked={formData.isPublic === false}
                  onChange={handlePublicChange}
                  disabled={loading}
                  className="form-radio"
                />
                <span className="ml-2">Private</span>
              </label>
            </div>
          </div>
        </BodyModal>
        <FooterModal>
          <ModalCloseButton onClick={handleClose} />
          <ModalSubmitButton>
            {loading ? (
              <span className="animate-spin">Loading...</span>
            ) : (
              "Create Album"
            )}
          </ModalSubmitButton>
        </FooterModal>
      </Form>
    </ModalLayout>
  );
};

export default ModalAddNewAlbum;