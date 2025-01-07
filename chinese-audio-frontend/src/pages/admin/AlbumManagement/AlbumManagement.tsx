import styled from "styled-components";
import ManagementLayout from "../../../layouts/AdminLayout/ManagementLayout/ManagementLayout";
import AlbumActions from "../../../components/admin/ManagementLayout/Actions/AlbumActions";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { getAllAlbums } from "../../../services/albumService";
import { toast } from "react-toastify";

const StyledAlbumManagement = styled.div``;

interface AlbumManagementProps {}

export const albumLoader: LoaderFunction = async () => {
    try {
        const data = await getAllAlbums();
        return { data };
    } catch (error: any) {
        console.error("Error in albumLoader", error);
        toast.error(error.message || "An error occurred");
        return { data: null };
    }
};

const AlbumManagement: React.FC<AlbumManagementProps> = (props) => {
    const { data } = useLoaderData() as { data: any };
    const albums = data.albums;

    const columnNames = ["id", "title", "avatar", "description"];

    return (
        <StyledAlbumManagement>
            <ManagementLayout
                title="Album Management"
                columnNames={columnNames}
                data={albums}
                Actions={AlbumActions}
            />
        </StyledAlbumManagement>
    );
};

export default AlbumManagement;
