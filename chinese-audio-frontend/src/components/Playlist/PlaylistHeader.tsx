import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AlbumAttributes } from "../../services/albumService";

const StyledPlaylistHeader = styled.header.attrs<{ $containerWidth: number }>((props) => ({
    style: {
        height: `calc(180px + ${props?.$containerWidth / 15 || 0}px)`,
    },
}))`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-image: linear-gradient(to top right, #466cb4df -20%, #2734697a 200%);
`;

const AlbumAvatar = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    padding: 20px;
    img {
        box-sizing: border-box;
        aspect-ratio: 1/1;
        width: 100%;
        border-radius: 5px;
        object-fit: cover;
        box-shadow: 0 0 20px 5px #0000007d;
    }
`;

const TitleContainer = styled.div`
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    & > div {
        flex: 1;
    }
    & > div:nth-child(1) {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }
`;

const PlaylistTitle = styled.h2.attrs<{ $containerWidth: number }>((props) => ({
    style: {
        fontSize: props.$containerWidth / 15 + "px",
    },
}))`
    margin-block: 5px;
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`;

interface PlaylistHeaderProps {
    albumDetail?: AlbumAttributes;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({albumDetail, ...props}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });
        resizeObserver.observe(containerRef.current!);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    return (
        <StyledPlaylistHeader ref={containerRef} $containerWidth={width}>
            <AlbumAvatar>
                <img src={albumDetail?.avatar} alt={albumDetail?.title} />
            </AlbumAvatar>
            <TitleContainer>
                <div>{albumDetail?.isPublic ? 'Public playlist' : 'Private playlist'}</div>
                <PlaylistTitle $containerWidth={width}>{albumDetail?.title}</PlaylistTitle>
                <div>
                    <p>{albumDetail?.description}</p>
                </div>
            </TitleContainer>
        </StyledPlaylistHeader>
    );
};

export default PlaylistHeader;
