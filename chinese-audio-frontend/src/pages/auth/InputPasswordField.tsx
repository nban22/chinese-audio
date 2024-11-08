import { useState } from "react";
import styled from "styled-components";
import IconEye from "../../icons/IconEye";
import IconEyeInvisible from "../../icons/IconEyeInvisible";
import { Input } from "./auth.styled";

const StyledInputPasswordField = styled.div<{ $eyeColor: string }>`
    position: relative;
    background-color: transparent;
    width: 100%;

    div {
        position: absolute;
        right: 10px;
        top: 53%;
        transform: translateY(-50%);
        cursor: pointer;
        color: ${({ $eyeColor }) => $eyeColor};
    }
`;

interface InputPasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    eyeColor?: string;
    [x: string]: any;
}

const InputPasswordField: React.FC<InputPasswordFieldProps> = ({ placeholder = "", eyeColor="#fff", ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible((pre) => !pre);
    };

    return (
        <StyledInputPasswordField $eyeColor={eyeColor}>
            <Input
                {...props}
                type={isPasswordVisible ? "text" : "password"}
                placeholder={placeholder}
            />  
            <div onClick={handleTogglePasswordVisibility}>
                {isPasswordVisible ? <IconEye size={20} /> : <IconEyeInvisible size={20} />}
            </div>
        </StyledInputPasswordField>
    );
};

export default InputPasswordField;
