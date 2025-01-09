import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

interface AuthButtonProps {
  title: string;
  loading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = (props) => {
  return (
    <button
      type="submit"
      className="flex justify-center mt-2 w-full rounded-full bg-green-500 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-green-400"
    >
      {props.loading ? (
        <ArrowPathRoundedSquareIcon className="h-6 w-6 animate-spin text-gray-500" />
      ) : (
        props.title
      )}
    </button>
  );
};

export default AuthButton;
