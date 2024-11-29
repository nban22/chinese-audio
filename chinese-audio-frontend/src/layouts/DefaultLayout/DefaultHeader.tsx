import styled from "styled-components";
import logo from "../../assets/SmallLogo.svg";
import { useNavigate } from "react-router-dom";
import HeaderControls from "../../components/DefaultHeader/HeaderControls";

const StyledDefaultHeader = styled.div`
    grid-area: header;
    height: calc(48px);
    display: flex;
    justify-content: space-between;
    overflow: hidden;
`;

const StyledSmallLogo = styled.img`
    height: 100%;
    background-color: #ffffffbd;
    border-radius: 50%;
    margin-left: 20px;
    display: block;
    box-sizing: border-box;
`;


const AccountSection = styled.div`
    height: 100%;
    display: flex;
    background-color: #78777769;
    border-radius: 50%;
    aspect-ratio: 1;
    justify-content: center;
    align-items: center;

    object-fit: cover;
    img {
        height: calc(100% - 10px);
        border-radius: 50%;
        aspect-ratio: 1;
        background-color: #ffffffbd;
    }
`;

interface DefaultHeaderProps {}

const DefaultHeader: React.FC<DefaultHeaderProps> = (props) => {
    const navigate = useNavigate();
    return (
        <StyledDefaultHeader>
            <StyledSmallLogo src={logo} alt="Small Logo" onClick={() => navigate('/')}/>
            <HeaderControls />
            <AccountSection>
                <img src="https://robohash.org/16?set=set4" alt="avatar" />
            </AccountSection>
        </StyledDefaultHeader>
    );
};

export default DefaultHeader;
