import { Form } from "react-router-dom";
import HeaderModal from "../admin/Modal/HeaderModal";
import ModalLayout from "../admin/Modal/ModalLayout";
import BodyModal from "../admin/Modal/BodyModal";
import InputFieldModal from "../admin/Modal/InputFieldModal";
import React, { FormEvent, useState, useEffect } from "react";
import FooterModal from "../admin/Modal/FooterModal";
import { putUpdateAlbum } from "../../services/albumService";

interface EditAlbumModalProps {
  onClose: () => void;
  album: any;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  description: string;
  avatar?: string | File; // Allow string (URL) or File (for upload)
  releaseDate: string | null;
  isPublic: boolean;
}

const EditAlbumModal: React.FC<EditAlbumModalProps> = (props) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    avatar: "",
    releaseDate: null,
    isPublic: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(
    props.album?.avatar || null,
  ); // For image preview

  // Pre-populate form with album data when the modal opens
  useEffect(() => {
    if (props.album) {
      setFormData({
        title: props.album.title || "",
        description: props.album.description || "",
        avatar: props.album.avatar || "",
        releaseDate: props.album.releaseDate || null,
        isPublic: props.album.isPublic || false,
      });
      setPreviewAvatar(props.album.avatar || null); // Set initial avatar preview
    }
  }, [props.album]);

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
      if (
        typeof formData.avatar === "string" &&
        formData.avatar.startsWith("blob:")
      ) {
        URL.revokeObjectURL(formData.avatar);
      }
    }
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: "", // Clear the avatar
    }));
    setPreviewAvatar(null); // Clear the preview
    // Clean up any blob URL if it exists
    if (
      typeof formData.avatar === "string" &&
      formData.avatar.startsWith("blob:")
    ) {
      URL.revokeObjectURL(formData.avatar);
    }
  };

  const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isPublic: e.target.value === "true",
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submissionData = {
        ...formData,
        id: props.album.id, // Include the album ID in the submission
        createdAt: props.album.createdAt, // Keep original createdAt
        updatedAt: new Date().toISOString(), // Update updatedAt on submission
      };

      // If avatar is a File, handle the upload logic (you may need to adjust based on your API)
      if (formData.avatar instanceof File) {
        // Here, you would typically upload the file to your server and get a URL back
        // For now, we'll simulate keeping the file reference or converting it
        submissionData.avatar = formData.avatar; // Placeholder; replace with actual upload logic
      }

      await putUpdateAlbum(props.album.id, submissionData);

      props.onSuccess();
      setFormData({
        title: "",
        description: "",
        avatar: "",
        releaseDate: null,
        isPublic: false,
      });
      setPreviewAvatar(null); // Clear preview on success
      props.onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the album");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: props.album.title || "",
      description: props.album.description || "",
      avatar: props.album.avatar || "",
      releaseDate: props.album.releaseDate || null,
      isPublic: props.album.isPublic || false,
    });
    setPreviewAvatar(props.album.avatar || null); // Reset preview
    props.onClose();
  };

  return (
    <ModalLayout>
      <HeaderModal title="Edit Album" onClose={handleClose} />
      <Form onSubmit={handleSubmit} id="edit-album-form">
        <BodyModal>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="title"
              label="Title"
              placeholder="Enter title"
              name="title"
              required={true}
              disabled={loading}
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="description"
              label="Description"
              placeholder="Enter description"
              name="description"
              required={false}
              disabled={loading}
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            {previewAvatar && (
              <div className="mt-2">
                <img
                  src={previewAvatar}
                  alt="Avatar Preview"
                  className="h-full w-full rounded object-cover"
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
            <label className="block text-sm font-medium text-white">
              Release Date
            </label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate || ""}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full rounded-sm border-gray-300 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Public Status
            </label>
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
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="createdAt"
              label="Created At"
              name="createdAt"
              required={false}
              disabled={true} // Disable this field
              value={props.album.createdAt || ""}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputFieldModal
              id="updatedAt"
              label="Updated At"
              name="updatedAt"
              required={false}
              disabled={true} // Disable this field
              value={props.album.updatedAt || ""}
            />
          </div>
        </BodyModal>
        <FooterModal>
          <button
            type="submit"
            form="edit-album-form"
            disabled={loading}
            className="rounded-md bg-blue-500 px-4 py-2 text-gray-100 hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
          <button
            onClick={handleClose}
            className="rounded-md bg-gray-700 px-4 py-2 text-gray-300 hover:bg-gray-600"
          >
            Cancel
          </button>
        </FooterModal>
      </Form>
    </ModalLayout>
  );
};

export default EditAlbumModal;
