import styled from "styled-components";
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import { forwardRef, useEffect, useRef, useState } from "react";



// const SidebarWrapper = styled.div.attrs<SidebarProps>((props) => ({
//     style: {
//         width: `${props.$width || 220}px`,
//         minWidth: `${props.$minWidth || 60}px`,
//         maxWidth: `${props.$maxWidth || 550}px`,
//     },
// }))<SidebarProps>`
//     display: flex;
//     position: relative;
//     overflow: hidden;
//     /* margin-left: var(--panel-gap, 8px); */
//     transition: all 50ms linear;
// `;

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

interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
}

const Sidebar: React.FC<SidebarProps> = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
    const [width, setWidth] = useState(220);
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
    return (
            <StyledSidebar ref={ref}>
                <SidebarHeader
                    isExpanded={isExpanded.current}
                    onCollapseToggle={handleCollapse}
                    onExpandToggle={handleExpand}
                />
                <SidebarContent />
            </StyledSidebar>
    );
} );

export default Sidebar;
