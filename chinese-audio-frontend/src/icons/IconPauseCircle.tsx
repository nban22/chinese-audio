function IconPauseCircle(props: IconProps) {
    return (
        <svg
            viewBox="65 65 896 896"
            fill="currentColor"
            height={props.size}
            width={props.size}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z" />
        </svg>
    );
}

export default IconPauseCircle;