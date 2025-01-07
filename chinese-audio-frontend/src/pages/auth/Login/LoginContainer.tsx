import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import InputField from "../../../components/Auth/InputField";
import AuthLayout from "../../../components/Auth/AuthLayout";
import AuthButton from "../../../components/Button/AuthButton";


interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <AuthLayout title="Log In to Chinese Audio">
            <form onSubmit={handleSubmit}>
                <InputField
                    title="Email or username"
                    type="text"
                    placeholder="Email or username"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <InputField
                    title="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="bg-transparent">
                            {showPassword ? (
                                <EyeIcon className="h-6 w-6 text-gray-500" />
                            ) : (
                                <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                            )}
                        </button>
                    }
                />
                <div className="pb-4">
                    <AuthButton title="Log In" />
                </div>
                <div className="pb-4 text-center">
                    <a href="#" className="text-white hover:text-green-500">
                        Forgot your password?
                    </a>
                </div>
                <div>
                    <p className="text-white text-center">
                        <span className="text-gray-300">Don't have an account?</span>{" "}
                        <a href="/signup" className="text-white hover:text-green-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default LoginContainer;
