import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  return (
    <button
      {...props}
      className="rounded-md bg-red-400 p-1 hover:brightness-75"
    >
      <TrashIcon className="h-6 w-6" />
    </button>
  );
};

export default DeleteButton;
