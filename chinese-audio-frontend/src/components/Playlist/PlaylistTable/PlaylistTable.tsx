import styled from "styled-components";
import IconBxTime from "../../../icons/IconBxTime";
import AudioItem from "./AudioItem";
import { AudioAttributes } from "../../../services/audioService";

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

const TableBody = styled.tbody`
`



interface PlaylistTableProps {
    audios?: AudioAttributes[];
}

const PlaylistTable: React.FC<PlaylistTableProps> = ({audios, ...props}) => {    
    return (
        <StyledPlaylistTable>
            <table>
                <TableHeader>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Album</th>
                        <th>Date Added</th>
                        <th>
                            <IconBxTime size={17} />
                        </th>
                    </tr>
                </TableHeader>
                <TableBody>
                    {audios?.map((audio, i) => (
                        <AudioItem key={audio.id} audio={audio} index={i}/>
                    ))}

                </TableBody>
            </table>
        </StyledPlaylistTable>
    );
};

export default PlaylistTable;
