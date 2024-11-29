import styled from 'styled-components';

const StyledResizeBar = styled.div`
    grid-area: tabresize;
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

interface ResizeBarProps {
    resizeHandleMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ResizeBar: React.FC<ResizeBarProps> = (props) => {
    return (
        <StyledResizeBar onMouseDown={props.resizeHandleMouseDown}/>
    );
};

export default ResizeBar;