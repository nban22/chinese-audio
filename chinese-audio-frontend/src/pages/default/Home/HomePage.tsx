import styled from "styled-components";
import AlbumList from "../../../components/Album/AlbumList";
import { getAllAlbumLists } from "../../../services/albumListService";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const StyledHomePage = styled.div``;

interface HomePageProps {}

export const albumListsLoader: LoaderFunction = async () => {
    // const {albumLists} = await getAllAlbumLists();
    // return { albumLists };
    try {
        const data = await getAllAlbumLists();
        return { data };
    } catch (error: any) {
        console.error("Error in albumListsLoader", error);
        toast.error(error.message || "An error occurred");
        return { albumLists: [] };
    }
};

const HomePage: React.FC<HomePageProps> = (props) => {
    const data = useLoaderData() as { albumLists: any[] };
    console.log({ data });

    const albumLists = data.albumLists;
    

    if (1) {
        return <div>Loading...</div>;
    }

    return (
        <StyledHomePage>
            {albumLists?.map((albumList: any) => (
                <AlbumList key={albumList.id} albumList={albumList} />
            ))}
        </StyledHomePage>
    );
};

export default HomePage;
