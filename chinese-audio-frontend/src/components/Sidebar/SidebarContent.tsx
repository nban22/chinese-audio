import styled from "styled-components";
import SidebarItem from "./SidebarItem";

const StyledSidebarContent = styled.div`
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px; /* Round the scrollbar thumb */
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

interface SidebarContentProps {}

const SidebarContent: React.FC<SidebarContentProps> = (props) => {
    return (
        <StyledSidebarContent>
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
            <SidebarItem
                avatar="https://via.placeholder.com/150"
                title="John Doe"
                type="Artist"
                axtraInfo="5 songs"
            />
        </StyledSidebarContent>
    );
};

export default SidebarContent;
