interface ModalCloseButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="rounded-md border-2 border-white px-4 py-2 font-semibold text-white hover:bg-white hover:text-black"
    >
      {props.children || "Close"}
    </button>
  );
};

export default ModalCloseButton;
