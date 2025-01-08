import { Link } from "react-router-dom";
import logo from "../../assets/SmallLogo.svg";
import HeaderControls from "../../components/DefaultHeader/HeaderControls";

interface DefaultHeaderProps {}

const DefaultHeader: React.FC<DefaultHeaderProps> = (props) => {
  return (
    <header className="flex h-12 justify-between">
      <a href="/" className="block aspect-square h-full">
        <img src={logo} alt="Small Logo" className="h-auto w-full" />
      </a>
      <HeaderControls />
      {/* <div className="h-full aspect-square border-2 border-x-zinc-400 rounded-full">
                <img src="https://robohash.org/16?set=set4" className="w-full h-auto overflow-clip" alt="avatar" />
            </div> */}
      <div className="flex gap-3">
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
      </div>
    </header>
  );
};

export default DefaultHeader;
