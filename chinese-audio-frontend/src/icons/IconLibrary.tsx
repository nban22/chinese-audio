// icon:library | Lucide https://lucide.dev/ | Lucide

function IconLibrary(props: IconProps) {
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
      <path d="M16 6l4 14M12 6v14M8 8v12M4 4v16" />
    </svg>
  );
}

export default IconLibrary;
