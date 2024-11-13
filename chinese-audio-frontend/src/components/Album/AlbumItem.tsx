import styled from "styled-components";
import IconPlayCircle from "../../icons/IconPlayCircle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlbumAttributes } from "../../services/albumService";

const StyledAlbumItem = styled.div`
    padding: 10px;
    width: 100%;
    height: fit-content;
    border-radius: 4px;
    cursor: pointer;
    &:hover,
    &:active {
        background-color: #222222bc;
    }

    .play-icon {
        cursor: pointer;
        opacity: 0;
        transition: all 200ms ease;
        bottom: -20px;
        right: 5px;
        z-index: 20;
        background-color: #222;
        border-radius: 50%;
        clip-path: circle(21px);
    }
    &:hover .play-icon {
        opacity: 1;
        bottom: 5px;
    }
    .avatar-container::before {
        content: " ";
        display: block;
        inset: 0;
        position: absolute;
        z-index: 10;
    }
    &:hover .avatar-container::before {
        background-image: linear-gradient(to top, #000000e2 -20%, #ffffff69 200%);
    }
`;

const AvatarContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 5px;
    overflow: hidden;
    img {
        position: absolute;
        width: 100%;
        inset: 0;
        aspect-ratio: 1/1;
        object-fit: cover;
    }
    .play-icon {
        position: absolute;
        color: var(--primary-color);
    }
`;

const DescriptionText = styled.p`
    width: 100%;
    font-size: 0.82rem;
    margin-block-start: 6px;
    margin-block-end: 0;
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.35em;
    max-height: 2.7em;
    white-space: normal;
`;

interface AlbumItemProps {
    album?: AlbumAttributes;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album, ...props }) => {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        if (album?.avatar === null) {
            return;
        }
        setAvatar(album?.avatar || null);
    }, []);

    return (
        <StyledAlbumItem
            onClick={() => {
                navigate(`/playlist/${album?.id}`);
            }}
        >
            <AvatarContainer className="avatar-container">
                <img src={avatar || "https://placehold.co/600x400"} alt="placeholder" />
                <IconPlayCircle className="play-icon" size={50} />
            </AvatarContainer>
            <DescriptionText>{album?.description}</DescriptionText>
        </StyledAlbumItem>
    );
};

export default AlbumItem;
