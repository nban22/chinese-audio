import styled from "styled-components";
import AlbumItem from "./AlbumItem";
import ListContainer from "./ListContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlbumAttributes, AlbumListAttributes } from "../../pages/AlbumListDetailPage";

const StyledAlbumList = styled.div``;

const ListHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AlbumTitle = styled.h2`
    margin-block-end: 10px;
    margin-inline-start: 10px;
    display: inline-block;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const ShowAllButton = styled.button`
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 0.9rem;
    align-self: flex-end;
    margin-block-end: 10px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

interface AlbumListProps {
    showAll?: boolean;
    albumList?: AlbumListAttributes;
}


const AlbumList: React.FC<AlbumListProps> = ({ showAll = false, albumList}, props) => {
    
    const navigate = useNavigate();
    const handleShowAll = () => {
        navigate("/albums-list/id");
    };
    return (
        <StyledAlbumList>
            <ListHeaderContainer>
                <AlbumTitle onClick={handleShowAll}>{albumList?.title}</AlbumTitle>
                {showAll ? "" : <ShowAllButton onClick={handleShowAll}>Show all</ShowAllButton>}
            </ListHeaderContainer>
            <ListContainer showAll={showAll} albums={albumList?.albums} />
        </StyledAlbumList>
    );
};

export default AlbumList;
