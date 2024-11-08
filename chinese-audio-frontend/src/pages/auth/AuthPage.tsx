import { Outlet } from "react-router-dom";
import { StyledAuthPage } from "./auth.styled";

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = (props) => {
    return (
        <StyledAuthPage>
            <Outlet />
        </StyledAuthPage>
    );
};

export default AuthPage;
