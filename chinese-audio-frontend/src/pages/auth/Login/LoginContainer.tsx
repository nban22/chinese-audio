import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import InputField from "../../../components/Auth/InputField";
import AuthLayout from "../../../components/Auth/AuthContainer";
import AuthButton from "../../../components/Button/AuthButton";
import { postLogin } from "../../../services/authServices";
import useUser from "../../../hooks/useUser";
import { Form, Link, LoaderFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ERROR_CODES } from "../../../constants/errorCodes";

interface LoginContainerProps {}

export const LoginContainerLoader: LoaderFunction = async () => {
  return { data: null };
};

const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  const { login, role, logout } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (role) {
      const logoutConfirmation = window.confirm(
        "Are you sure you want to log out?"
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
      email: "",
      password: "",
    };
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
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
    setLoading(true);
    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const data = await postLogin(formData.email, formData.password);
      login(data.token);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error: any) {
      if (error.errorCode === ERROR_CODES.USER.USER_NOT_FOUND.code) {
        setErrors({
          ...errors,
          email: ERROR_CODES.USER.USER_NOT_FOUND.message,
        });
      } else if (error.errorCode === ERROR_CODES.USER.INCORRECT_PASSWORD.code) {
        setErrors({
          ...errors,
          password: ERROR_CODES.USER.INCORRECT_PASSWORD.message,
        });
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Log In to Chinese Audio">
      <Form onSubmit={handleSubmit}>
        <InputField
          title="Your email"
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          errorMessage={errors.email}
        />
        <InputField
          title="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
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
        <div className="py-4">
          <AuthButton title="Log In" loading={loading} />
        </div>
        <div className="pb-4 text-center">
          <Link to="#" className="text-white hover:text-green-500">
            Forgot your password?
          </Link>
        </div>
        <div>
          <p className="text-center text-white">
            <span className="text-gray-300">Don't have an account?</span>{" "}
            <Link to="/signup" className="text-white hover:text-green-500">
              Sign up
            </Link>
          </p>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default LoginContainer;
