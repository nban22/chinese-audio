import styled from "styled-components";

const StyledSidebarItem = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  div {
    flex: 1;
    display: grid;
    grid-template-rows: 1fr 1fr;

    & > * {
      display: flex;
      align-items: center;
    }
  }
  h2 {
    font-size: 1rem;
    margin: 0;
    font-weight: 600;
  }
  p {
    font-size: 0.8rem;
    margin: 0;
    color: #b3b3b3;
  }
`;

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
  object-fit: cover;
`;

interface SidebarItemProps {
  isCollapsed?: boolean;
  avatar?: string;
  title?: string;
  type?: string;
  axtraInfo?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  return (
    <div className={`flex gap-3 ${props.isCollapsed ? 'mx-auto' : 'px-3'}`}>
      <div className="aspect-square w-14 flex-shrink-0">
        <img
          src={props.avatar}
          alt={props.title}
          className="h-auto w-full rounded-xl"
        />
      </div>
      <div className={`min-w-0 ${props?.isCollapsed && 'hidden'}`}>
        <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-white">
          {props.title}
        </h2>
        <p>
          {props.type} • {props.axtraInfo}
        </p>
      </div>
    </div>
  );
};

export default SidebarItem;
