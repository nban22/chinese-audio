import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlbumAttributes } from "../../services/albumService";
import { PlayIcon } from "@heroicons/react/24/solid";



interface AlbumItemProps {
  album?: AlbumAttributes;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (album?.avatar === null) {
      return;
    }
    setAvatar(album?.avatar || null);
  }, []);

  return (
    <div className="rounded-md hover:bg-zinc-700 hover:bg-opacity-50 group min-w-[180px] max-w-[220px]">
      <button
        onClick={() => {
          navigate(`/playlist/${album?.id}`);
        }}
        className="p-4"
      >
        <div className="relative aspect-square w-full">
          <img
            src={avatar || "https://placehold.co/800x800"}
            alt="placeholder"
            className="h-auto w-full object-cover rounded-md"
          />
          <button className="absolute bottom-2 right-2 rounded-full bg-primary p-3 transition-all ease-out duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ">
            <PlayIcon className="h-6 w-6 text-black" />
          </button>
        </div>
        <p className="line-clamp-2 overflow-hidden text-ellipsis text-white">
          {album?.description}
        </p>
      </button>
    </div>
  );
};

export default AlbumItem;
