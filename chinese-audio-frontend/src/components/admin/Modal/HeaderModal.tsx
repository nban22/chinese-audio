import { XMarkIcon } from "@heroicons/react/24/solid";

interface HeaderModalProps {
    title: string;
    onClose: () => void;
}

const HeaderModal: React.FC<HeaderModalProps> = (props) => {
    return (
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 id="modal-title" className="text-lg font-semibold">
            {props.title}
          </h2>
          <button
            onClick={props.onClose}
            className="text-zinc-300 hover:text-zinc-500 focus:outline-none"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-10 w-10" />
          </button>
        </div>
    );
};

export default HeaderModal;