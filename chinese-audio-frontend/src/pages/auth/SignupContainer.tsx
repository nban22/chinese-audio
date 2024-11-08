import { Form } from "react-router-dom";
import styled from "styled-components";
import InputPasswordField from "./InputPasswordField";
import { Header, Input, StyledForm, SubmitButton } from "./auth.styled";

const StyledSignupContainer = styled.div`

`;


interface SignupContainerProps {}

const SignupContainer: React.FC<SignupContainerProps> = (props) => {
    return (
        <StyledSignupContainer>
            <Header>
                <h2>Welcome to Sign up</h2>
            </Header>
            <StyledForm>
                <Input type="email" placeholder="Email" />
                <InputPasswordField  placeholder="Password" eyeColor="#000000c4"/>
                <InputPasswordField  placeholder="Confirm Password" eyeColor="#000000c4"/>
                <SubmitButton type="submit">Sign up</SubmitButton>
            </StyledForm>
        </StyledSignupContainer>
    );
};

export default SignupContainer;
