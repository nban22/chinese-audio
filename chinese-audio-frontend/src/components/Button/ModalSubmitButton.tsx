interface ModalSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    backgroundColor?: 'primary' | 'danger';
}

const ModalSubmitButton: React.FC<ModalSubmitButtonProps> = (props) => {
  return (
    <button
      type="submit"
      className={`break-words rounded-md px-4 py-2 font-semibold text-white brightness-90 hover:brightness-100 ${props.backgroundColor === 'danger' ? 'bg-red-500' : 'bg-primary'}`}
      style={{ textShadow: "1px 1px 1px black"}}
      {...props}
    >
      {props.children || "Submit"}
    </button>
  );
};

export default ModalSubmitButton;
