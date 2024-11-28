import styled from 'styled-components';

const StyledAccountProfile = styled.div`
    
`;

interface AccountProfileProps {

}

const AccountProfile: React.FC<AccountProfileProps> = (props) => {
    return (
        <StyledAccountProfile>
            <h1>AccountProfile</h1>
        </StyledAccountProfile>
    );
};

export default AccountProfile;