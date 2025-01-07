interface AuthButtonProps {
    title: string;
}

const AuthButton: React.FC<AuthButtonProps> = (props) => {
    return (
        <button
            type="submit"
            className="w-full mt-2 py-3 text-white bg-green-500 rounded-full transition-all duration-200 hover:bg-green-400 hover:scale-105"
        >
            {props.title}
        </button>
    );
};

export default AuthButton;
