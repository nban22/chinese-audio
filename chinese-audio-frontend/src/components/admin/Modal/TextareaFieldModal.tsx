interface TextareaFieldModalProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextareaFieldModal: React.FC<TextareaFieldModalProps> = ({
  label,
  ...props
}) => {
  return (
    <>
      <label htmlFor={props.id} className="block text-sm font-medium">
        {label}
      </label>
      <textarea
        {...props}
        className={`mt-1 block w-full min-w-0 rounded-sm border border-white bg-zinc-600 px-3 py-2 text-lg shadow-sm outline-none`}
      />
    </>
  );
};

export default TextareaFieldModal;
