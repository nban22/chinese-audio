import logo from "../../assets/SmallLogo.svg";
import HeaderControls from "../../components/DefaultHeader/HeaderControls";

interface DefaultHeaderProps {}

const DefaultHeader: React.FC<DefaultHeaderProps> = (props) => {
    return (
        <header className="h-12 flex justify-between">
            <a href="/" className="h-full aspect-square block">
                <img src={logo} alt="Small Logo" className="w-full h-auto" />
            </a>
            <HeaderControls />
            <div className="h-full aspect-square border-2 border-x-zinc-400 rounded-full">
                <img src="https://robohash.org/16?set=set4" className="w-full h-auto overflow-clip" alt="avatar" />
            </div>
        </header>
    );
};

export default DefaultHeader;
