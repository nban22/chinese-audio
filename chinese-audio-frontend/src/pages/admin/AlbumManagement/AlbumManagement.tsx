import styled from "styled-components";
import ManagementLayout from "../../../layouts/AdminLayout/ManagementLayout/ManagementLayout";
import AlbumActions from "../../../components/admin/ManagementLayout/Actions/AlbumActions";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { getAllAlbums } from "../../../services/albumService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ModalAddNewAlbum from "../../../components/Modal/ModalAddNewAlbum";

interface AlbumManagementProps {}


const AlbumManagement: React.FC<AlbumManagementProps> = (props) => {
  const [albums, setAlbums] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const columnNames = {
    id: "Id",
    title: "Title",
    description: "Description",
    avatar: "Cover",
    createdAt: "Created At",
    updatedAt: "Updated At",
  };

  const fetchAlbums = async () => {
    try {
      const albumsData = await getAllAlbums();
      console.log("albumsData", albumsData);
      
      setAlbums(albumsData.albums);
    } catch (error: any) {
      console.error("Error in fetchAlbums", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <main className="custom-scrollbar h-full overflow-auto">
      <ManagementLayout
        title="Album Management"
        columnNames={columnNames}
        data={albums}
        Actions={AlbumActions}
        onAddItem={() => setShowAddModal(true)}
        onFetchData={() => fetchAlbums()}
      />
      {showAddModal && (
        <ModalAddNewAlbum
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            console.log("onSuccess");
            
            fetchAlbums();
            return Promise.resolve();
          }}
        />
      )}
    </main>
  );
};

export default AlbumManagement;
