import AlbumItem from "./AlbumItem";
import { useEffect, useRef, useState } from "react";
import { AlbumAttributes } from "../../services/albumService";

interface ListContainerProps {
  showAll?: boolean;
  albums?: AlbumAttributes[];
}

const ListContainer: React.FC<ListContainerProps> = ({
  showAll = false,
  albums,
  ...props
}) => {
  const containerTag = useRef<HTMLDivElement>(null);

  return (
    <div className="custom-no-scrollbar w-full overflow-auto px-5">
      <div
        ref={containerTag}
        className={`${showAll ? "grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]" : "flex flex-nowrap"}`}
      >
        {albums?.map((album) => <AlbumItem key={album.id} album={album} />)}
      </div>
    </div>
  );
};

export default ListContainer;
