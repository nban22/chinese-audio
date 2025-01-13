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
    <NavLink
      to={props.to || "#"}
      className={({ isActive, isPending }) =>
        isActive
          ? "rounded-md bg-primary opacity-80"
          : isPending
            ? "rounded-md bg-primary bg-opacity-15"
            : ""
      }
    >
      <div className="flex h-14 gap-4 rounded-md px-3 transition-transform hover:scale-105 hover:transform">
        <IconWrapper>{props.icon}</IconWrapper>
        <ItemText>{props.title}</ItemText>
      </div>
    </NavLink>
  );
};

export default AdminSiderbarItem;
