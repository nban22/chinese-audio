import styled from "styled-components";
import AlbumList from "../../../components/Album/AlbumList";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllSeries } from "../../../services/seriesService";

const StyledHomePage = styled.div``;

interface HomePageProps {}

export const albumListsLoader: LoaderFunction = async () => {
    try {
        const data = await getAllSeries();
        return { data };
    } catch (error: any) {
        console.error("Error in albumListsLoader", error);
        toast.error(error.message || "An error occurred");
        return { data: null };
    }
};

const HomePage: React.FC<HomePageProps> = (props) => {
    const { data } = useLoaderData() as { data: any };

    const seriesList = data.seriesList;

    if (!seriesList) {
        return <div>Loading...</div>;
    }

    return (
        <StyledHomePage>
            {seriesList?.map((albumList: any) => (
                <AlbumList key={albumList.id} albumList={albumList} />
            ))}
        </StyledHomePage>
    );
};

export default HomePage;
