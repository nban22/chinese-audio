import styled from 'styled-components';
import AlbumItem from './AlbumItem';
import { MouseEvent, useEffect, useRef, useState } from 'react';

const StyledListContainer = styled.div<{$length: number}>`
    display: grid;
    grid-template-columns: repeat(${props => props.$length}, 1fr);
    & > * {
        display: none;
    }
    ${props => Array.from({length: props.$length}).map((_, index) => `
        & > *:nth-child(${index + 1}) {
            display: block;
        }
    `).join(" ")}
`;

interface ListContainerProps {

}

const ListContainer: React.FC<ListContainerProps> = (props) => {
    const containerTag = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);
    const minItemWidth = 140;
    
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width)    
        })
        resizeObserver.observe(containerTag.current!);
        return () => {
            resizeObserver.disconnect();
        }
    }, [])

    useEffect(() => {
        setLength(Math.floor(width / minItemWidth));
        console.log(length);
        
    }, [width])
    return (
        <StyledListContainer ref={containerTag} $length={length}>
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
        </StyledListContainer>
    );
};

export default ListContainer;