import styled from "styled-components";
import AlbumList from "../../../components/Album/AlbumList";

import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { AlbumListAttributes, getSeriesById } from "../../../services/seriesService";
import { toast } from "react-toastify";

const StyledAlbumsContainer = styled.div``;

interface AlbumsContainerProps {}

export const albumListLoader: LoaderFunction = async ({ params }) => {
    try {
        const data = await getSeriesById(params.id as string);
        return { data };
    } catch (error: any) {
        console.error("Error in albumListLoader", error);
        toast.error(error.message || "An error occurred");
        return { data: null };
    }
};

const AlbumsContainer: React.FC<AlbumsContainerProps> = (props) => {
    const { data } = useLoaderData() as { data: any };
    console.log({ data });

    const series = data.series;

    return (
        <StyledAlbumsContainer>
            <AlbumList showAll={true} albumList={series} />
        </StyledAlbumsContainer>
    );
};

export default AlbumsContainer;
