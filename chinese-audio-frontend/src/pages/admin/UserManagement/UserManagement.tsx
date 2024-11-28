import styled from 'styled-components';

const StyledUserManagement = styled.div`
    
`;

interface UserManagementProps {

}

const UserManagement: React.FC<UserManagementProps> = (props) => {
    return (
        <StyledUserManagement>
            <h1>UserManagement</h1>
        </StyledUserManagement>
    );
};

export default UserManagement;