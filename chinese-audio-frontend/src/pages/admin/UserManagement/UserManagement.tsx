import styled from 'styled-components';
import ManagementLayout from '../../../layouts/AdminLayout/ManagementLayout/ManagementLayout';
import UserActions from '../../../components/admin/ManagementLayout/Actions/UserActions';

const StyledUserManagement = styled.div`
    
`;

interface UserManagementProps {

}

const UserManagement: React.FC<UserManagementProps> = (props) => {
    const columns = ["Username", "Email", "Role"];
    const data = [
        ["nban22", "nban22@gmail.com", "admin"],
        ["nban23", "nban23@gmail.com", "user"],
        ["nban24", "nban24@gmail.com", "user"]
    ]

    return (
        <StyledUserManagement>
            <ManagementLayout 
                title='User Management'
                columnNames={columns}
                data={data}
                Actions={UserActions}
            />
        </StyledUserManagement>
    );
};

export default UserManagement;