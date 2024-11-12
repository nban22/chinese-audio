import styled from "styled-components";
import AlbumItem from "./AlbumItem";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { AlbumAttributes } from "../../pages/AlbumListDetailPage";

const StyledListContainer = styled.div<{ $length: number; $showAll: boolean }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.$length}, 1fr);
    & > * {
        display: ${(props) => (props.$showAll ? "block" : "none")};
    }
    ${(props) =>
        Array.from({ length: props.$length })
            .map(
                (_, index) => `
                    & > *:nth-child(${index + 1}) {
                        display: block;
                    }
                `
            )
            .join(" ")}
`;

interface ListContainerProps {
    showAll?: boolean;
    albums?: AlbumAttributes[];
}

const ListContainer: React.FC<ListContainerProps> = ({ showAll = false, albums, ...props }) => {
    const containerTag = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(document.body.clientWidth*0.8);
    const minItemWidth = 180;
    const [length, setLength] = useState(Math.floor(width / minItemWidth));

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });
        resizeObserver.observe(containerTag.current!);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        setLength(Math.floor(width / minItemWidth));
    }, [width]);
    return (
        <StyledListContainer ref={containerTag} $length={length} $showAll={showAll}>
            {albums?.map((album) => (
                <AlbumItem key={album.id} album={album} />
            ))}
        </StyledListContainer>
    );
};

export default ListContainer;
