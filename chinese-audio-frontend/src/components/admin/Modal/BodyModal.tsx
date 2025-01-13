
interface BodyModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const BodyModal: React.FC<BodyModalProps> = (props) => {
    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-4" {...props}>
            {props.children}
        </div>
    );
};

export default BodyModal;