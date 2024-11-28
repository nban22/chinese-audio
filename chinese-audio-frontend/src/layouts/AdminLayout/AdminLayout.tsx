
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const StyledAdminLayout = styled.div`
    height: 100vh;
    display: grid;
    grid-template-areas: 
        "sidebar header header"
        "sidebar main main"
        "sidebar main main";
    grid-template-columns: calc(250px + 2vw) 1fr 1fr;
    grid-template-rows: auto 1fr 1fr;
    gap: 10px;
    background-color: var(--black-background-color, #000);
    color: var(--white-text-color, #fff);
    overflow: hidden;   
    padding: 10px;
`;

const StyledOutletContainer = styled.div`
    grid-area: main;
    overflow-y: auto;
    padding: 10px;
    background-color: var(--gray-background-color, #000);
    border-radius: 10px;
`

interface AdminLayoutProps {

}

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
    return (
        <StyledAdminLayout>
            <AdminSidebar />
            <AdminHeader />
            <StyledOutletContainer>
                <Outlet />
            </StyledOutletContainer>
        </StyledAdminLayout>
    );
};

export default AdminLayout;