
function IconPlayerTrackPrev(props: IconProps) {
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
      <path d="M21 5v14l-8-7zM10 5v14l-8-7z" />
    </svg>
  );
}

export default IconPlayerTrackPrev;
