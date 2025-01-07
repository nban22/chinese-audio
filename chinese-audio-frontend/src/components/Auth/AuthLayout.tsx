import logo from "../../assets/SmallLogo.svg";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
    return (
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-2/5 min-h-screen sm:h-auto mx-auto my-0 sm:my-20 py-10 px-3 sm:px-10 bg-neutral-800 rounded-none sm:rounded-lg overflow-x-hidden">
            <header className="flex flex-col items-center py-4">
                <div className="bg-slate-300 rounded-full mb-1" style={{ width: "calc(2.5rem + 1vw)" }}>
                    <img src={logo} alt="logo" className="max-w-full h-auto" />
                </div>
                <h1 className="text-3xl font-extrabold text-white">{title}</h1>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default AuthLayout;
