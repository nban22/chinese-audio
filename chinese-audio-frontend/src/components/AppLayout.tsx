import styled from "styled-components";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import Header from "./Header/Header";
import { useCallback, useEffect, useRef, useState } from "react";

const StyledAppLayout = styled.div.attrs<{ $columnSizes: string }>((props) => ({
    style: {
        gridTemplateColumns: props.$columnSizes,
    },
}))`
    height: calc(var(--vh, 1vh) * 100);
    background-color: #000000;
    display: grid;
    grid-template-rows: auto 1fr auto;
    color: #ffffff;
    padding-inline: 10px;
    & > *:nth-child(1) {
        grid-column: 1 / span 4;
    }
    & > *:nth-child(2) {
        overflow-y: auto;
    }
    /* &>*:nth-child(3) {

    } */
    & > *:nth-child(4) {
        grid-column: 3 / span 2;
        overflow-y: auto;
    }
    & > *:nth-child(5) {
        grid-column: 1 / span 4;
    }
`;

const ResizeHandle = styled.div`
    width: 8px;
    min-height: 0;
    margin-block: 10px;
    position: relative;
    border-radius: 10px;
    transition: all 100ms linear;
    cursor: grab;

    &::before {
        border-radius: 10px;
        position: absolute;
        content: "";
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2px;
        height: 100%;
        background-color: var(--primary-color, #0742e3);
        transition: all 50ms linear;
        opacity: 0;
    }
    &:hover::before,
    &:active::before {
        opacity: 1;
        transform-origin: center;
        box-shadow: 0 0 3px #707b99;
    }
`;

const MainContainer = styled.main`
    background-color: #111;
    border-radius: 10px;
`;

interface AppLayoutProps {
    children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
    const [columnSizes, setColumnSizes] = useState(
        "minmax(220px, auto) auto minmax(300px, 1fr) auto"
    );
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const sidebarWidth = useRef(0);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const diff = e.clientX - startX.current;

        setColumnSizes(
            `minmax(220px, ${sidebarWidth.current + diff}px) auto minmax(300px, 1fr) auto`
        );
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        console.log("remove mousemove");
    }, []);

    const resizeHandleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        startX.current = e.clientX;
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
        if (isDragging === false) {
            sidebarWidth.current = sidebarRef.current?.getBoundingClientRect().width || 0;
            window.removeEventListener("mouseup", handleMouseUp);
        }
    }, [isDragging]);
    return (
        <StyledAppLayout $columnSizes={columnSizes}>
            <Header />
            <Sidebar ref={sidebarRef} />
            <ResizeHandle onMouseDown={resizeHandleMouseDown} />
            <MainContainer>{props.children}</MainContainer>
            <MusicPlayer />
        </StyledAppLayout>
    );
};

export default AppLayout;
