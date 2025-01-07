import { forwardRef, useEffect, useRef, useState } from "react";
import DefaultSidebarHeader from "../../components/DefaultSidebar/DefaultSidebarHeader";
import DefaultSidebarContent from "../../components/DefaultSidebar/DefaultSidebarContent";

interface DefaultSidebarProps extends React.HTMLProps<HTMLDivElement> {
  [key: string]: any;
}

const DefaultSidebar: React.FC<DefaultSidebarProps> = (props) => {
  const [width, setWidth] = useState(280); // Default width
  const collapsedWidth = 72;
  const expandedWidth = 420;
  const idleWidth = 280;
  const isResizing = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    if (width === expandedWidth) {
      setWidth(idleWidth);
    } else {
      setWidth(expandedWidth);
    }
  };

  const handleCollapse = () => {
    setWidth(width === collapsedWidth ? idleWidth : collapsedWidth);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const halfWidth = (collapsedWidth + idleWidth) / 2;
    if (isResizing.current && sidebarRef.current) {
      const newWidth =
        e.clientX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth < idleWidth && newWidth >= halfWidth) {
        setWidth(idleWidth);
      } else if (newWidth < halfWidth && newWidth >= collapsedWidth) {
        setWidth(collapsedWidth);
      } else if (newWidth >= collapsedWidth && newWidth <= expandedWidth) {
        setWidth(newWidth); // Update width dynamically
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.userSelect = "auto";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="relative h-full" style={{ width }}>
      <nav ref={sidebarRef} className="flex flex-col h-full" style={{ width }}>
        <DefaultSidebarHeader
          isCollapsed={width === collapsedWidth}
          isExpanded={width === expandedWidth}
          onCollapseToggle={handleCollapse}
          onExpandToggle={handleExpand}
        />
        <DefaultSidebarContent 
          isCollapsed={width === collapsedWidth}
        />
      </nav>
      <div
        className="absolute right-[calc(-1*var(--panel-gap))] top-0 flex h-full w-[var(--panel-gap)] cursor-grab items-center justify-center before:z-10 before:h-[calc(100%-2rem)] before:w-[1px] before:rounded-lg before:bg-transparent before:shadow-lg before:transition-all before:duration-300 before:content-[''] before:hover:bg-neutral-800 before:hover:shadow-xl"
        onMouseDown={handleMouseDown} // Start resizing on mouse down
      >
        <label className="hidden">Sidebar Resize Handle</label>
      </div>
    </div>
  );
};

export default DefaultSidebar;
