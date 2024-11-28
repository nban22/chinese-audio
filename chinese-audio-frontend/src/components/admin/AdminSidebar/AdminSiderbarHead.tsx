import styled from 'styled-components';

const StyledAdminSiderbarHead = styled.div`
    
    h2 {
        margin-block: 5px;
    }
`;

interface AdminSiderbarHeadProps {

}

const AdminSiderbarHead: React.FC<AdminSiderbarHeadProps> = (props) => {
    return (
        <StyledAdminSiderbarHead>
            <h2>Chinese Audio</h2>
        </StyledAdminSiderbarHead>
    );
};

export default AdminSiderbarHead;