import styled from "styled-components";
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import { useEffect, useRef, useState } from "react";

interface SidebarProps {
    $width?: number;
    $minWidth?: number;
    $maxWidth?: number;
}

const SidebarWrapper = styled.div.attrs<SidebarProps>((props) => ({
    style: {
        width: `${props.$width || 220}px`,
        minWidth: `${props.$minWidth || 60}px`,
        maxWidth: `${props.$maxWidth || 550}px`,
    },
}))<SidebarProps>`
    display: flex;
    position: relative;
    overflow: hidden;
    margin-left: var(--panel-gap, 8px);
    transition: all 50ms linear;
`;

const StyledSidebar = styled.div`
    background-color: #121212;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
`;

const StyledResizeHandle = styled.div`
    position: absolute;
    width: 8px;
    height: 100%;
    background-color: #ffffff1f;
    cursor: ew-resize;
    right: -4px;
    top: 0;
    z-index: 1;
    opacity: 0;

    &:hover {
        opacity: 1;
    }
`;

const Sidebar: React.FC = () => {
    const [width, setWidth] = useState(220);
    const isResizing = useRef(false);
    const resizableBox = useRef<HTMLDivElement>(null);

    const collapsedWidth = 60;
    const expandedWidth = 550;
    const idleWidth = 220;

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
        e.preventDefault(); // Prevent text selection
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        const box = resizableBox.current;
        if (box) {
            const newWidth = Math.max(
                e.clientX - box.getBoundingClientRect().left,
                220
            );
            setWidth(Math.min(newWidth, 500));
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <SidebarWrapper
            $width={width}
            $minWidth={collapsedWidth}
            $maxWidth={expandedWidth}
        >
            <StyledSidebar ref={resizableBox}>
                <SidebarHeader
                    isExpanded={isExpanded.current}
                    onCollapseToggle={handleCollapse}
                    onExpandToggle={handleExpand}
                    
                />
                <SidebarContent />
            </StyledSidebar>
            <StyledResizeHandle onMouseDown={handleMouseDown} />
        </SidebarWrapper>
    );
};

export default Sidebar;
