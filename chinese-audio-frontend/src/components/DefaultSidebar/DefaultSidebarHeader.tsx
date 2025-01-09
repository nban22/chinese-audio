import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RectangleStackIcon as RectangleStackIconOutline,
} from "@heroicons/react/24/outline";
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
          <RectangleStackIconOutline className="h-8 w-8 text-white" />
        ) : (
          <RectangleStackIconSolid className="h-8 w-8 text-white" />
        )}
      </button>
      {!props.isCollapsed && (
        <h3 className="text-xl font-bold text-white">Your Library</h3>
      )}
      {!props.isCollapsed && (
        <button
          onClick={() => props.onExpandToggle()}
          className="flex aspect-square h-full items-center justify-center"
        >
          {props.isExpanded ? (
            <ArrowLeftIcon className="h-8 w-8 text-white" />
          ) : (
            <ArrowRightIcon className="h-8 w-8 text-white" />
          )}
        </button>
      )}
    </header>
  );
};

export default SidebarHeader;
