function IconTimes(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height={props.size}
      width={props.size}
      {...props}
    >
      <path d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
    </svg>
  );
}

export default IconTimes;
