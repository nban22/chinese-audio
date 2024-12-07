import styled from "styled-components";

import { useCallback, useEffect, useRef, useState } from "react";
import DefaultHeader from "./DefaultHeader";
import MusicPlayer from "./MusicPlayer";
import DefaultSidebar from "./DefaultSidebar";
import { Outlet, useNavigation } from "react-router-dom";
import ResizeBar from "./ResizeBar";

const StyledDefaultLayout = styled.div.attrs<{ $columnSizes: string }>((props) => ({
    style: {
        gridTemplateColumns: props.$columnSizes,
    },
}))`
    display: grid;
    grid-template-areas:
        "header header header header"
        "sidebar tabresize main main"
        "musicplayer musicplayer musicplayer musicplayer";
    grid-template-rows: auto 1fr auto;
    height: 100vh;
    background-color: #000000;
    color: #ffffff;
    padding: 10px;
    row-gap: 10px;
`;

const MainContainer = styled.main`
    grid-area: main;
    background-color: #111111;
    border-radius: 10px;
    overflow: auto;
`;

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    const navigation = useNavigation();
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
            <StyledDefaultLayout $columnSizes={columnSizes}>
                <DefaultHeader />
                <DefaultSidebar ref={sidebarRef} />
                <ResizeBar resizeHandleMouseDown={resizeHandleMouseDown} />
                <MainContainer>
                    <Outlet />
                </MainContainer>
                <MusicPlayer />
            </StyledDefaultLayout>
    );
};

export default DefaultLayout;
