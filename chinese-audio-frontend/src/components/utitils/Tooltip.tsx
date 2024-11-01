import React, { useState } from 'react';
import styled from 'styled-components';

// Styled component cho Tooltip
const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const TooltipText = styled.div<{ $visible: boolean, $bottom: string, $left: string }>`
    visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
    background-color: rgba(81, 80, 80, 0.75);
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: ${({$bottom}) => ($bottom ? $bottom : '125%')}; // Vị trí trên phần tử
    left: ${({$left}) => ($left ? $left : '50%')};
    transform: translateX(-50%);
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.2s;
`;

interface TooltipProps extends React.HTMLProps<HTMLDivElement> {
    text: string; // Nội dung tooltip
    children: React.ReactNode; // Phần tử con
    bottom?: string;
    left?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, bottom="125%", left="50%", ...rest }) => {
    const [visible, setVisible] = useState(false);

    return (
        <TooltipContainer
            {...rest}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            <TooltipText $visible={visible} $bottom={bottom} $left={left}>{text}</TooltipText>
        </TooltipContainer>
    );
};

export default Tooltip;
