import styled from "styled-components";
import DefaultSidebarHeader from "../../components/DefaultSidebar/DefaultSidebarHeader";
import DefaultSidebarContent from "../../components/DefaultSidebar/DefaultSidebarContent";
import { forwardRef, useEffect, useRef, useState } from "react";

const StyledDefaultSidebar = styled.div`
    grid-area: sidebar;
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

interface DefaultSidebarProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
}

const DefaultSidebar: React.FC<DefaultSidebarProps> = forwardRef<
    HTMLDivElement,
    DefaultSidebarProps
>((props, ref) => {
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
        <StyledDefaultSidebar ref={ref}>
            <DefaultSidebarHeader
                isExpanded={isExpanded.current}
                onCollapseToggle={handleCollapse}
                onExpandToggle={handleExpand}
            />
            <DefaultSidebarContent />
        </StyledDefaultSidebar>
    );
});

export default DefaultSidebar;
