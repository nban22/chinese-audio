import styled from "styled-components";
import AlbumItem from "./AlbumItem";
import ListContainer from "./ListContainer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlbumListAttributes } from "../../services/seriesService";
import { AlbumAttributes } from "../../services/albumService";
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

const AlbumList: React.FC<AlbumListProps> = ({
  showAll = false,
  albumList,
}) => {
  const navigate = useNavigate();
  const handleShowAll = () => {
    navigate(`/section/${albumList?.id}`);
  };
  return (
    <section>
      <div className="mb-2 mt-5 flex items-center justify-between">
        <h2
          onClick={handleShowAll}
          className="cursor-pointer text-2xl font-bold hover:underline"
        >
          {albumList?.title}
        </h2>
        {showAll ? (
          ""
        ) : (
          <Link
            to={`/section/${albumList?.id}`}
            className="text-sm font-bold hover:underline"
          >
            Show all
          </Link>
        )}
      </div>
      <ListContainer showAll={showAll} albums={albumList?.albums} />
    </section>
  );
};

export default AlbumList;
