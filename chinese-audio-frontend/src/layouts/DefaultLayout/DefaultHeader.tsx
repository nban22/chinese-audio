import { Link } from "react-router-dom";
import logo from "../../assets/SmallLogo.svg";
import HeaderControls from "../../components/DefaultHeader/HeaderControls";
import useUser from "../../hooks/useUser";

interface DefaultHeaderProps {}

const AccountSection: React.FC<{ user: any }> = (props) => {
  return (
    <>
      <div className="flex items-center">
        <span className="text-2xl font-bold text-white">
          {props.user?.username}
        </span>
      </div>
      <div className="aspect-square h-full overflow-hidden rounded-full shadow-[inset_0_0_0_2px_#fff]">
        <img
          src={props.user?.avatar || "https://robohash.org/1"}
          alt="avatar"
          className="h-auto w-full"
        />
      </div>
    </>
  );
};

const DefaultHeader: React.FC<DefaultHeaderProps> = (props) => {
  const { user, role } = useUser();
  return (
    <header className="flex h-12 justify-between">
      <Link
        to="/"
        className="ml-3 block aspect-square h-full rounded-full bg-zinc-300"
      >
        <img
          src={logo}
          alt="Small Logo"
          className="h-auto w-full rounded-full"
        />
      </Link>
      <HeaderControls />
      <div className="flex gap-3">
        {role ? (
          <AccountSection user={user} />
        ) : (
          <>
            <Link to="/signup">
              <button className="h-full rounded-full bg-transparent px-4 font-bold text-zinc-200 hover:bg-zinc-800 active:bg-zinc-900">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="h-full rounded-full bg-white px-4 font-bold text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default DefaultHeader;
