import HeaderModal from "../admin/Modal/HeaderModal";
import ModalLayout from "../admin/Modal/ModalLayout";
import BodyModal from "../admin/Modal/BodyModal";
import FooterModal from "../admin/Modal/FooterModal";
import React from "react";

interface ViewAlbumModalProps {
  onClose: () => void;
  album: {
    id: number;
    title: string;
    description: string;
    avatar?: string; // URL or path to the image
    releaseDate: string | null;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const ViewAlbumModal: React.FC<ViewAlbumModalProps> = (props) => {
  const { album, onClose } = props;

  return (
    <ModalLayout>
      <HeaderModal title="View Album" onClose={onClose} />
      <BodyModal>
        <div className="col-span-12 md:col-span-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">ID</label>
            <p className="mt-1 text-gray-100">{album.id || "No ID provided"}</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Title</label>
            <p className="mt-1 text-gray-100">{album.title || "No title provided"}</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <p className="mt-1 text-gray-100">{album.description || "No description provided"}</p>
          </div>
        </div>
        {album.avatar && (
          <div className="col-span-12">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Avatar</label>
              <div className="mt-1">
                <img
                  src={album.avatar}
                  alt="Album Avatar"
                  className="h-32 w-32 object-cover rounded-md border border-gray-600"
                />
              </div>
            </div>
          </div>
        )}
        <div className="col-span-12 md:col-span-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Release Date</label>
            <p className="mt-1 text-gray-100">
              {album.releaseDate ? new Date(album.releaseDate).toLocaleDateString() : "Not set"}
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Public Status</label>
            <p className="mt-1 text-gray-100">{album.isPublic ? "Public" : "Private"}</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Created At</label>
            <p className="mt-1 text-gray-100">
              {album.createdAt ? new Date(album.createdAt).toLocaleString() : "Not set"}
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Updated At</label>
            <p className="mt-1 text-gray-100">
              {album.updatedAt ? new Date(album.updatedAt).toLocaleString() : "Not set"}
            </p>
          </div>
        </div>
      </BodyModal>
      <FooterModal>
        <button
          onClick={onClose}
          className="rounded-md bg-gray-700 px-4 py-2 text-gray-300 hover:bg-gray-600"
        >
          Close
        </button>
      </FooterModal>
    </ModalLayout>
  );
};

export default ViewAlbumModal;