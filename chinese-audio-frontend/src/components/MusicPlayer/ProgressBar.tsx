import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledProgressBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    & > span {
        user-select: none;
        width: 40px;
        &:first-child {
            text-align: right;
        }
        &:last-child {
            text-align: left;
        }
    }
`;

const ProgressContainer = styled.div`
    flex: 1;
    height: 9px;
    background-color: #333;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;

    --progress-bar-duration: 1000ms;
    --progress-bar-transform: 50%;

    .progress-bar {
        position: absolute;
        height: 100%;
        width: var(--progress-bar-transform);
        background-color: #a7a7a7;
        border-radius: 5px;

        .progress-thumb {
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: #fff;
            border-radius: 50%;
            top: 50%;
            right: -3px;
            transform: translateY(-50%);
        }

        &:hover .progress-thumb,
        .progress-thumb:hover {
            width: 15px;
            height: 15px;
            right: -5px;
        }
    }
    &:hover .progress-bar {
        background-color: var(--primary-color);
    }
    &:hover .progress-thumb {
        width: 15px;
        height: 15px;
        right: -5px;
    }
    &:active .progress-bar {
        height: 10px;
        box-shadow: 0 0 5px #0d7aff;
        background-color: var(--primary-color);
    }
`;

interface ProgressBarProps {
    totalDuration?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalDuration = 254 }) => {
    const [progress, setProgress] = useState(30);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const progressPercent = (progress / totalDuration) * 100;

    useEffect(() => {
        intervalId.current = setInterval(() => {
            setProgress((prev) => (prev + 1) % totalDuration);
        }, 1000);

        return () => clearInterval(intervalId.current!);
    }, [totalDuration]);

    useEffect(() => {
        containerRef.current!.style.setProperty("--progress-bar-transform", `${progressPercent}%`);
    }, [progressPercent]);

    // Mouse move handler (throttled)
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const containerRect = containerRef.current!.getBoundingClientRect();
            const offsetX = e.clientX - containerRect.left;
            const newProgress = Math.max(
                0,
                Math.min((offsetX / containerRect.width) * totalDuration, totalDuration)
            );
            setProgress(newProgress);
        },
        [totalDuration]
    );

    // Handle mouse down to start progress adjustment
    const handleMouseDown = (e: React.MouseEvent) => {
        handleMouseMove(e.nativeEvent); // Adjust on initial click
        document.addEventListener("mousemove", handleMouseMove);
    };

    // Clean up mousemove listener on mouse up
    const handleMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", handleMouseMove);
        console.log("mouse move event listener removed");
        
    }, [handleMouseMove]);

    // Register and clean up global event listeners
    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseUp]);

    return (
        <StyledProgressBar>
            <span>{`${Math.floor(progress / 60)}:${String(Math.floor(progress % 60)).padStart(
                2,
                "0"
            )}`}</span>
            <ProgressContainer ref={containerRef} onMouseDown={handleMouseDown}>
                <div className="progress-bar">
                    <span className="progress-thumb"></span>
                </div>
            </ProgressContainer>
            <span>4:23</span>
        </StyledProgressBar>
    );
};

export default ProgressBar;
