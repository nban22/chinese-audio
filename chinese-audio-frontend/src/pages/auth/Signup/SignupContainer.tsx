import { Form, Link, LoaderFunction, useNavigate } from "react-router-dom";
import InputField from "../../../components/Auth/InputField";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthButton from "../../../components/Button/AuthButton";
import { postSignup } from "../../../services/authServices";
import AuthContainer from "../../../components/Auth/AuthContainer";
import { toast } from "react-toastify";
import { ERROR_CODES } from "../../../constants/errorCodes";
import useUser from "../../../hooks/useUser";

interface SignupContainerProps {}

export const SignupContainerLoader: LoaderFunction = async () => {
  return { data: null };
};

const SignupContainer: React.FC<SignupContainerProps> = (props) => {
  const { role, logout } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (role) {
      const logoutConfirmation = window.confirm(
        "Are you sure you want to log out?",
      );
      if (logoutConfirmation) {
        logout();
        toast.info("Logged out successfully");
      } else {
        navigate("/");
      }
    }
  }, []);

  const validate = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Valid email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((message) => message.length === 0); // Return true if no errors
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      [e.target.id]: "",
    });
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      await postSignup(
        formData.email,
        formData.password,
        formData.username.trim(),
      );
      toast.success("Sign up successful");
      navigate("/login");
    } catch (error: any) {
      if (error.errorCode === ERROR_CODES.USER.USER_ALREADY_EXISTS.code) {
        setErrors({
          ...errors,
          email: ERROR_CODES.USER.USER_ALREADY_EXISTS.message,
        });
      } else if (error.errorCode === ERROR_CODES.USER.INVALID_EMAIL.code) {
        setErrors({
          ...errors,
          email: ERROR_CODES.USER.INVALID_EMAIL.message,
        });
      } else if (
        error.errorCode === ERROR_CODES.USER.MISSING_CREDENTIALS.code
      ) {
        setErrors({
          ...errors,
          email: ERROR_CODES.USER.MISSING_CREDENTIALS.message,
        });
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <AuthContainer title="Sign Up to Chinese Audio">
      <Form onSubmit={handleSubmit}>
        <InputField
          title="Username"
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required={true}
          errorMessage={errors.username}
        />
        <InputField
          title="Email"
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required={true}
          errorMessage={errors.email}
        />
        <InputField
          title="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required={true}
          errorMessage={errors.password}
          icon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="bg-transparent"
            >
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
          required={true}
          errorMessage={errors.confirmPassword}
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
        <div className="pb-5 pt-3">
          <AuthButton title="Sign Up" />
        </div>
        <hr className="my-5" />
        <p className="text-center text-white">
          <span className="text-gray-300">Don't have an account?</span>{" "}
          <Link to="/login" className="text-white hover:text-green-500">
            Log in
          </Link>
        </p>
      </Form>
    </AuthContainer>
  );
};

export default SignupContainer;
