interface SidebarItemProps {
  isCollapsed?: boolean;
  avatar?: string;
  title?: string;
  type?: string;
  axtraInfo?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  return (
    <div className={`flex gap-3 ${props.isCollapsed ? "mx-auto" : "px-3"}`}>
      <div className="aspect-square w-14 flex-shrink-0">
        <img
          src={props.avatar}
          alt={props.title}
          className="h-auto w-full rounded-xl"
        />
      </div>
      <div className={`min-w-0 ${props?.isCollapsed && "hidden"}`}>
        <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-white">
          {props.title}
        </h2>
        <p className="text-gray-300">
          {props.type} • {props.axtraInfo}
        </p>
      </div>
    </div>
  );
};

export default SidebarItem;
