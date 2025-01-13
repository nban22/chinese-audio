interface InputFieldModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputFieldModal: React.FC<InputFieldModalProps> = ({label, ...props}) => {
  return (
    <>
      <label htmlFor={props.id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        {...props}
        className={`mt-1 block w-full min-w-0 rounded-sm border border-white bg-zinc-600 px-3 py-2 text-lg shadow-sm outline-none ${props.className || ''}`}
      />
    </>
  );
};

export default InputFieldModal;
