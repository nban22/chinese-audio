import styled from "styled-components";
import { Header, Input, StyledForm, SubmitButton } from "./auth.styled";
import InputPasswordField from "./InputPasswordField";

const StyledLoginContainer = styled.div``;

interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = (props) => {
    return (
        <StyledLoginContainer>
            <Header>
                <h2>Welcome to Login</h2>
            </Header>
            <StyledForm>
                <Input type="email" placeholder="Email" />
                <InputPasswordField placeholder="Password" eyeColor="#000000c4" />
                <SubmitButton type="submit">Login</SubmitButton>
            </StyledForm>
        </StyledLoginContainer>
    );
};

export default LoginContainer;
