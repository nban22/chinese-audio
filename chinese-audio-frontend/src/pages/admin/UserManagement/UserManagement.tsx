import styled from 'styled-components';
import ManagementLayout from '../../../layouts/AdminLayout/ManagementLayout/ManagementLayout';
import UserActions from '../../../components/admin/ManagementLayout/Actions/UserActions';
import { getUserList } from '../../../services/userServices';
import { useLoaderData } from 'react-router-dom';

const StyledUserManagement = styled.div`
    
`;

interface UserManagementProps {

}

export const UserManagementLoader = async () => {
    let usersData = [];
    try {
        usersData = await getUserList();
    } catch (error) {
        usersData = [];
    }
    return { usersData };
}

const UserManagement: React.FC<UserManagementProps> = (props) => {
    const { usersData } = useLoaderData() as { usersData: any };
    const columns = ["Username", "Email", "Role"];
    const columnKeys = {
        username: "Username",
        email: "Email",
        role: "Role"
    }
    return (
        <div>
            <ManagementLayout 
                title='User Management'
                columnNames={columnKeys}
                data={usersData.users || []}
                Actions={UserActions}
            />
        </div>
    );
};

export default UserManagement;