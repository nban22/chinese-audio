import styled from "styled-components";
import ManagementLayout from "../../../layouts/AdminLayout/ManagementLayout/ManagementLayout";
import AlbumActions from "../../../components/admin/ManagementLayout/Actions/AlbumActions";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { getAllAlbums } from "../../../services/albumService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface AlbumManagementProps {}

export const albumLoader: LoaderFunction = async () => {
  try {
    const albumsData = await getAllAlbums();
    return { albumsData };
  } catch (error: any) {
    console.error("Error in albumLoader", error);
    toast.error(error.message || "An error occurred");
    return { albumsData: null };
  }
};

const AlbumManagement: React.FC<AlbumManagementProps> = (props) => {
  const { albumsData } = useLoaderData() as { albumsData: any };
  const [albums, setAlbums] = useState([]);
  const columnNames = {
    id: "Id",
    title: "Title",
    description: "Description",
    audios: "Audios",
    createdAt: "Created At",
    updatedAt: "Updated At",
  };

  const fetchAlbums = async () => {
    try {
      const albumsData = await getAllAlbums();
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
        data={albumsData.albums}
        Actions={AlbumActions}
      />
    </main>
  );
};

export default AlbumManagement;
