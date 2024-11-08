import styled from "styled-components";
import IconBxTime from "../../../icons/IconBxTime";

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

const TableRow = styled.tr`
    &:hover {
        background-color: #66666647;
    }
    td {
        font-size: 0.9rem;
        padding-block: 0.5rem;
        padding-right: 1rem;
        text-align: left;
    }
    td:nth-child(1) {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        width: 40px;
        text-align: right;
    }
    td:nth-last-child(1) {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: right;
    }
`;

interface PlaylistTableProps {}

const PlaylistTable: React.FC<PlaylistTableProps> = (props) => {
    return (
        <StyledPlaylistTable>
            <table>
                <TableHeader>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Date Added</th>
                        <th>
                            <IconBxTime size={17} />
                        </th>
                    </tr>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <td>1</td>
                        <td>The Lazy Song</td>
                        <td>Test Artist</td>
                        <td>Test Album</td>
                        <td>Test Date Added</td>
                        <td>3:21</td>
                    </TableRow>
                    <TableRow>
                        <td>2</td>
                        <td>The Lazy Song</td>
                        <td>Test Artist</td>
                        <td>Test Album</td>
                        <td>Test Date Added</td>
                        <td>3:21</td>
                    </TableRow>
                    <TableRow>
                        <td>3 </td>
                        <td>The Lazy Song</td>
                        <td>Test Artist</td>
                        <td>Test Album</td>
                        <td>Test Date Added</td>
                        <td>3:21</td>
                    </TableRow>
                </TableBody>
            </table>
        </StyledPlaylistTable>
    );
};

export default PlaylistTable;
