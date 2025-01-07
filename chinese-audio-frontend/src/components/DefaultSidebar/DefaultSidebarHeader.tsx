import IconArrowRight from "../../icons/IconArrowRight";
import IconArrowLeft from "../../icons/IconArrowLeft";
import { RectangleStackIcon as RectangleStackIconOutline } from "@heroicons/react/24/outline";
import { RectangleStackIcon as RectangleStackIconSolid } from "@heroicons/react/24/solid";

interface SidebarHeaderProps {
  onCollapseToggle: () => void;
  onExpandToggle: () => void;
  isExpanded: boolean;
  isCollapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = (props) => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <button
        onClick={() => props.onCollapseToggle()}
        className="flex h-10 w-10 items-center justify-center"
      >
        {props.isCollapsed ? (
          <RectangleStackIconOutline className="h-8 w-8 text-gray-500" />
        ) : (
          <RectangleStackIconSolid className="h-8 w-8 text-gray-500" />
        )}
      </button>
      {!props.isCollapsed && (
        <h3 className="text-xl font-bold">Your Library</h3>
      )}
      {!props.isCollapsed &&
        (props.isExpanded ? (
          <IconArrowLeft size={35} onClick={() => props.onExpandToggle()} />
        ) : (
          <IconArrowRight size={35} onClick={() => props.onExpandToggle()} />
        ))}
    </header>
  );
};

export default SidebarHeader;
