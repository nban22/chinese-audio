import styled from 'styled-components';
import SmallLogo from '../../icons/SmallLogo';
import logo from '../../assets/SmallLogo.svg'
import Tooltip from '../utitils/Tooltip';


const StyledHeader = styled.div`
    height: calc(48px + var(--panel-gap)* 2);
    padding: var(--panel-gap);
    position: relative;
`;

const StyledSmallLogo = styled.img`
    height: 100%;
    background-color: #ffffffbd;
    border-radius: 50%;
    margin-left: 20px;
    display: block;
    box-sizing: border-box;
    
`

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <StyledHeader>
            <div style={{
                height: '100%',
                width: 'fit-content',
                padding: '5px 0px',
            }}>
            <Tooltip text='Logo' style={{height: '100%'}} bottom='-74%' left='84%' >
                <StyledSmallLogo src={logo} alt="Small Logo" />
            </Tooltip>
            </div>
        </StyledHeader>
    );
};

export default Header;