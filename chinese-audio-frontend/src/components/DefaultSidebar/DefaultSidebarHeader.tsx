import styled from 'styled-components';
import IconLibrary from '../../icons/IconLibrary';
import IconArrowRight from '../../icons/IconArrowRight';
import IconArrowLeft from '../../icons/IconArrowLeft';

const StyledSidebarHeader = styled.div`
    display: flex;
    align-items: center;

    &>*:nth-child(1) {
        cursor: pointer;
        margin-inline: 10px;
        border-radius: 50%;
        padding: 7px;
        transition: all 100ms ease-in-out;
        user-select: none;

        &:hover {
            background-color: #ffffff1f;
        }

    }
    &>*:nth-child(2) {
        flex: 1;
        white-space: nowrap;
    }

    &>*:nth-last-child(1) {
        margin-right: 15px;
        user-select: none;
        cursor: pointer;
        border-radius: 50%;
        padding: 6px;
        transition: all 100ms ease-in-out;
        &:hover {
            background-color: #ffffff1f;
        }
    }
`;

const StyledHeaderText = styled.h1`
    font-size: 1.2rem;
    text-shadow: 0 0 2px #ffffff, 0 0 2px #ff79d2;
    font-weight: 600;
    display: inline-block;
    margin-block: 0;
    user-select: none;
`

interface SidebarHeaderProps {
    onCollapseToggle: () => void;
    onExpandToggle: () => void;
    isExpanded: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = (props) => {

    
    return (
        <StyledSidebarHeader>
            <IconLibrary size={40} onClick={() => props.onCollapseToggle()}/>
            <StyledHeaderText>Your Library</StyledHeaderText>
            {props.isExpanded ? <IconArrowLeft size={35} onClick={() => props.onExpandToggle()}/> :
            <IconArrowRight size={35} onClick={() => props.onExpandToggle()}/>}
        </StyledSidebarHeader>
    );
};

export default SidebarHeader;