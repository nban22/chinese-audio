import styled from 'styled-components';

const StyledAdminHeader = styled.div`
    grid-area: header;
    background-color: var(--gray-background-color, #111);
    color: var(--white-text-color, #fff);
    border-bottom: 1px solid #333;
    border-radius: 10px;
`;

const TitleText = styled.h1`
    margin: 0;
    padding: 20px;
`

interface AdminHeaderProps {
}

const AdminHeader: React.FC<AdminHeaderProps> = (props) => {
    return (
        <div className="">
            <TitleText>Welcome back, nban22</TitleText>
        </div>
    );
};

export default AdminHeader;