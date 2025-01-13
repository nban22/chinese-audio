import styled from "styled-components";
import IconBxTime from "../../../icons/IconBxTime";
import AudioItem from "./AudioItem";
import { AudioAttributes } from "../../../services/audioService";
import { ClockIcon } from "@heroicons/react/24/outline";

const StyledPlaylistTable = styled.div`
  /* background-color: red; */

  table {
    width: 100%;
    border-collapse: collapse;
  }
`;

const TableHeader = styled.thead`
  tr {
    border-bottom: 1px solid #333;
    /* background-color: blue; */
    th {
      color: #888;
      font-weight: normal;
      text-align: left;
      font-size: 0.9rem;
      padding-block: 0.5rem;
      padding-right: 1rem;
      vertical-align: bottom;
    }
    th:nth-child(1) {
      width: 40px;
      text-align: right;
    }
    th:nth-last-child(1) {
      text-align: right;
    }
  }
`;

const TableBody = styled.tbody``;

interface PlaylistTableProps {
  audios?: AudioAttributes[];
}

/*
export interface AudioAttributes {
    id?: string;
    title: string;
    description: string;
    playCount?: number;
    likeCount?: number;
    isPublic?: boolean;
    duration?: number;
    fileName: string;
    size: number;
    originalFileName: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
    dropboxPath?: string;
}

*/

const PlaylistTable: React.FC<PlaylistTableProps> = ({ audios, ...props }) => {
  audios = [
    {
      id: "1",
      title: "Test 1",
      description: "Description 1",
      playCount: 10,
      likeCount: 5,
      isPublic: true,
      duration: 100,
      size: 100,
      originalFileName: "originalFile1",
      url: "url1",
      uploadDate: new Date(),
    },
    {
      id: "2",
      title: "Test 2",
      description: "Description 2",
      playCount: 20,
      likeCount: 10,
      isPublic: true,
      duration: 200,

      size: 200,
      originalFileName: "originalFile2",
      url: "url2",
      uploadDate: new Date(),
    },
    {
      id: "3",
      title: "Test 3",
      description: "Description 3",
      playCount: 30,
      likeCount: 15,
      isPublic: true,
      duration: 300,
      size: 300,
      originalFileName: "originalFile3",
      url: "url3",
      uploadDate: new Date(),
    },
  ];
  return (
    <div className="px-5 text-zinc-300">
      <div className="grid h-10 grid-cols-[40px_2fr_1fr_1fr_60px] items-center">
        <div className="pe-3 text-end">#</div>
        <div>Title</div>
        <div>Album</div>
        <div>Date added</div>
        <div className="pe-5 text-end">
          <ClockIcon className="inline h-6 w-6" />
        </div>
      </div>
      <hr className="mb-3 border-zinc-600" />
      <div className="">
        {audios?.map((audio, i) => (
          <AudioItem key={audio.id} audio={audio} index={i} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistTable;
