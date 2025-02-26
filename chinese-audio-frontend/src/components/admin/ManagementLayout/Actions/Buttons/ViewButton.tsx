import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface ViewButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ViewButton: React.FC<ViewButtonProps> = (props) => {
  return (
    <button
      {...props}
      className="rounded-md bg-emerald-400 p-1 hover:brightness-75"
    >
      <MagnifyingGlassIcon className="h-6 w-6" />
    </button>
  );
};

export default ViewButton;
