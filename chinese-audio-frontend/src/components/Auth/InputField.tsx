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
}

const InputField: React.FC<InputFieldProps> = (props) => {
    return (
        <div className="pb-3">
            <div className="mb-2">
                <label htmlFor={props.id}>
                    <span className="text-white fs-6 fw-bold ">{props.title}</span>
                </label>
            </div>
            <div className="relative">
                <input
                    type={props.type}
                    id={props.id}
                    placeholder={props.placeholder}
                    className="w-full py-2 px-3 bg-transparent rounded outline-none border-2 border-neutral-500 focus:border-white focus:shadow-[inset_0_0_0_2px_white] transition-all duration-300 hover:border-white"
                />
                {props.icon && (<div className="absolute top-1/2 right-0 transform -translate-y-1/2 me-3 flex items-center">{props.icon}</div>)}
            </div>
        </div>
    );
};

export default InputField;
