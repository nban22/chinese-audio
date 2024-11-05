function IconSearch(props: IconProps) {
    return (
        <svg
            viewBox="3 1 20 20"
            fill="currentColor"
            height={props.size}
            width={props.size}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.319 14.433A8.001 8.001 0 006.343 3.868a8 8 0 0010.564 11.976l.043.045 4.242 4.243a1 1 0 101.415-1.415l-4.243-4.242a1.116 1.116 0 00-.045-.042zm-2.076-9.15a6 6 0 11-8.485 8.485 6 6 0 018.485-8.485z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default IconSearch;
