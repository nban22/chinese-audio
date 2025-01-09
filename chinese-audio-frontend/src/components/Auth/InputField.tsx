import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface InputFieldProps {
  title: string;
  type: string;
  placeholder: string;
  id: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
  className?: string;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <div className={`mb-3 ${props.className}`}>
      <div className="mb-2">
        <label htmlFor={props.id}>
          <span className="fs-6 fw-bold text-white">{props.title}</span>
        </label>
      </div>
      <div className="relative">
        <input
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required || false}
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          className="w-full rounded border-2 border-neutral-500 bg-transparent px-3 py-2 text-white outline-none transition-all duration-300 hover:border-white focus:border-white focus:shadow-[inset_0_0_0_2px_white]"
        />
        {props.icon && (
          <div className="absolute right-0 top-1/2 me-3 flex -translate-y-1/2 transform items-center">
            {props.icon}
          </div>
        )}
      </div>
      {props.errorMessage && (
        <div className="flex items-center rounded-md px-3 py-1 text-sm text-red-500 font-semibold" style={{ textShadow: "0 0 4px #000000" }}>
          <InformationCircleIcon className="me-2 h-6 w-6 text-white" />
          {props.errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputField;
