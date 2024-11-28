
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdminLayout = styled.div`
    height: 100vh;
    /* background-color: #000000; */
`;

interface AdminLayoutProps {

}

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
    return (
        <StyledAdminLayout>
            <h1>AdminLayout</h1>
            <Outlet />
        </StyledAdminLayout>
    );
};

export default AdminLayout;