
function IconPlayerTrackNext(props: IconProps) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height={props.size}
      width={props.size}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M3 5v14l8-7zM14 5v14l8-7z" />
    </svg>
  );
}

export default IconPlayerTrackNext;
