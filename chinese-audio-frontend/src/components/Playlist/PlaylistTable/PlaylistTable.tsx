import styled from 'styled-components';
import IconBxTime from '../../../icons/IconBxTime';

const StyledPlaylistTable = styled.div`
    /* background-color: red; */
`;

const TableHeader = styled.tr`
    border-bottom: 1px solid #333;
    th {
        color: #888;
        font-weight: normal;
    }
`

interface PlaylistTableProps {

}

const PlaylistTable: React.FC<PlaylistTableProps> = (props) => {
    return (
        <StyledPlaylistTable>
            <table>
                <TableHeader>
                    <th>#</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Date Added</th>
                    <th><IconBxTime size={20} /></th>
                </TableHeader>
            </table>
        </StyledPlaylistTable>
    );
};

export default PlaylistTable;