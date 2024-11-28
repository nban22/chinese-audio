import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledAdminSiderbarItem = styled(NavLink)`
    height: 60px;
    border-radius: 5px;
    background-color: #222;
    display: flex;
    text-decoration: none;
    color: #fff;
    &.active {
        background-color: var(--primary-color, #0742e3);
    }
    &.pending {
        background-color: #4caf50;
    }

    &:hover,
    &:active {
        filter: brightness(1.4);
    }
`;

const IconWrapper = styled.span`
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ItemText = styled.span`
    flex: 1;
    display: flex;
    align-items: center;
`;

interface AdminSiderbarItemProps {
    icon?: React.ReactNode;
    title: string;
    to?: string;
}

const AdminSiderbarItem: React.FC<AdminSiderbarItemProps> = (props) => {
    return (
        <StyledAdminSiderbarItem
            to={props.to || "#"}
            className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
            }
        >
            <IconWrapper>{props.icon}</IconWrapper>
            <ItemText>{props.title}</ItemText>
        </StyledAdminSiderbarItem>
    );
};

export default AdminSiderbarItem;
