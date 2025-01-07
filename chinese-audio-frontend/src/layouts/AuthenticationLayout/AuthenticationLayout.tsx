import { Outlet } from "react-router-dom";
import logo from "../../assets/SmallLogo.svg";

interface AuthenticationLayoutProps {}

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = (props) => {
  return (
    <div className="bg-gradient-to-b from-neutral-950 to-neutral-700  min-h-screen flex flex-col ">
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
