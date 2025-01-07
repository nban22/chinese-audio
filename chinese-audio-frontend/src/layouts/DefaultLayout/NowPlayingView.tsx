import { useEffect, useRef, useState } from "react";

interface NowPlayingViewProps {}

const NowPlayingView: React.FC<NowPlayingViewProps> = (props) => {
  const [width, setWidth] = useState(220); // Default width
  const collapsedWidth = 60;
  const expandedWidth = 550;
  const idleWidth = 220;
  const isResizing = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isExpanded = useRef(false);

  useEffect(() => {
    isExpanded.current = width > (expandedWidth + idleWidth) / 2;
  }, [width]);

  const handleExpand = () => {
    if (isExpanded.current) {
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
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current && sidebarRef.current) {
      const newWidth =
      sidebarRef.current.getBoundingClientRect().right - e.clientX;
      if (newWidth >= collapsedWidth && newWidth <= expandedWidth) {
        setWidth(newWidth); // Update width dynamically
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  return (
    <div className="relative h-full">
      <aside ref={sidebarRef} className="h-full" style={{ width }}>
          <h1 className="break-words">NowPlayingView</h1>
      </aside>
      <div
        onMouseDown={handleMouseDown}
        className="absolute left-[calc(-1*var(--panel-gap))] top-0 flex h-full w-[var(--panel-gap)] cursor-grab items-center justify-center before:z-10 before:h-[calc(100%-2rem)] before:w-[1px] before:rounded-lg before:bg-transparent before:shadow-lg before:transition-all before:duration-300 before:content-[''] before:hover:bg-neutral-800 before:hover:shadow-xl"
      >
        <label className="hidden">Handling Resize Bar</label>
      </div>
    </div>
  );
};

export default NowPlayingView;
