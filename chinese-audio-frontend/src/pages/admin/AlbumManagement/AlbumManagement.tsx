import styled from 'styled-components';
import ManagementLayout from '../../../layouts/AdminLayout/ManagementLayout/ManagementLayout';
import AlbumActions from '../../../components/admin/ManagementLayout/Actions/AlbumActions';

const StyledAlbumManagement = styled.div`
    
`;

interface AlbumManagementProps {

}

const AlbumManagement: React.FC<AlbumManagementProps> = (props) => {
    const columnNames = ["Album Name", "Album Cover", "Album Description"];
    const data = [
        ["Album 1", "album1.jpg", "This is album 1"],
        ["Album 2", "album2.jpg", "This is album 2"],
        ["Album 3", "album3.jpg", "This is album 3"],
        ["Album 4", "album4.jpg", "This is album 4"],
        ["Album 5", "album5.jpg", "This is album 5"],
    ]
    return (
        <StyledAlbumManagement>
            <ManagementLayout 
                title='Album Management'
                columnNames={columnNames}
                data={data}
                Actions={AlbumActions}
            />
        </StyledAlbumManagement>
    );
};

export default AlbumManagement;