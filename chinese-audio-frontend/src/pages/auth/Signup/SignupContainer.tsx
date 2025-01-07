import { Form } from "react-router-dom";
import AuthLayout from "../../../components/Auth/AuthLayout";
import InputField from "../../../components/Auth/InputField";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthButton from "../../../components/Button/AuthButton";

interface SignupContainerProps {}

const SignupContainer: React.FC<SignupContainerProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        <AuthLayout title="Sign Up to Chinese Audio">
            <Form onSubmit={handleSubmit}>
                <InputField
                    title="Username"
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <InputField
                    title="Email"
                    type="email"
                    placeholder="Email"
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
                <InputField
                    title="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    icon={
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="bg-transparent"
                        >
                            {showConfirmPassword ? (
                                <EyeIcon className="h-6 w-6 text-gray-500" />
                            ) : (
                                <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                            )}
                        </button>
                    }
                />
                <div className="pt-3 pb-5 ">
                    <AuthButton title="Sign Up" />
                </div>
                <hr className="my-5" />
                <p className="text-white text-center">
                    <span className="text-gray-300">Don't have an account?</span>{" "}
                    <a href="/login" className="text-white hover:text-green-500">
                        Log in
                    </a>
                </p>
            </Form>
        </AuthLayout>
    );
};

export default SignupContainer;
