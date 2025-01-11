import { useEffect, useRef, useState } from "react";
import { AlbumAttributes } from "../../services/albumService";

interface PlaylistHeaderProps {
  albumDetail?: AlbumAttributes;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  albumDetail,
  ...props
}) => {
  return (
    <header className="h-[calc(180px+5vw)] flex gap-5 p-5 bg-blue-900">
      <div className="w-[calc(180px+10vw)] min-w-28 max-w-fit flex items-end">
        <img
          src={albumDetail?.avatar}
          alt={albumDetail?.title}
          className="w-full max-w-fit max-h-full aspect-square rounded-md bg-white bg-opacity-20 object-cover"
        />
      </div>
      <div className="flex flex-col justify-end">
        <p className="text-sm text-white font-semibold">
          {albumDetail?.isPublic ? "Public playlist" : "Private playlist"}
        </p>
        <h2 className="text-6xl font-black text-white text-[calc(1rem+6vw)]">{albumDetail?.title}</h2>
        <p className="text-slate-300 leading-snug">
          {albumDetail?.description}
        </p>
      </div>
    </header>
  );
};

export default PlaylistHeader;
