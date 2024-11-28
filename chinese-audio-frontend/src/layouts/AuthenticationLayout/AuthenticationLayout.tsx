import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledAuthenticationLayout = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: #feac5e;
  background: -webkit-linear-gradient(
    to right,
    #4bc0c8,
    #c779d0,
    #feac5e
  );
  background: linear-gradient(
    to right,
    #4bc0c8,
    #c779d0,
    #feac5e
  );
  /* background-image: url("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(3px);
    z-index: -2;
  }

  & > * {
    width: clamp(350px, 90%, 600px);
    backdrop-filter: blur(40px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

interface AuthenticationLayoutProps {}

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = (props) => {
  return (
    <StyledAuthenticationLayout>
      <Outlet />
    </StyledAuthenticationLayout>
  );
};

export default AuthenticationLayout;
