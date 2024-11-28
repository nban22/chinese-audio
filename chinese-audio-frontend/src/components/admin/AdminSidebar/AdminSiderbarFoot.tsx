import styled from 'styled-components';

const StyledAdminSiderbarFoot = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

interface AdminSiderbarFootProps {
    children: React.ReactNode;
}

const AdminSiderbarFoot: React.FC<AdminSiderbarFootProps> = (props) => {
    return (
        <StyledAdminSiderbarFoot>
            {props.children}
        </StyledAdminSiderbarFoot>
    );
};

export default AdminSiderbarFoot;