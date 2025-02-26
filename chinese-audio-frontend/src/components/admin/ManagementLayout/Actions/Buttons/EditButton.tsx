import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface EditButtonProps extends React.HTMLAttributes<HTMLButtonElement> { }

const EditButton: React.FC<EditButtonProps> = (props) => {
    return (
        <button {...props} className="bg-blue-400 rounded-md p-1 hover:brightness-75">
            <PencilSquareIcon className="h-6 w-6" />

        </button>
    );
};

export default EditButton;
