import logo from "../../assets/SmallLogo.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthContainer: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="mx-auto my-0 min-h-screen w-full overflow-x-hidden rounded-none bg-neutral-800 px-3 py-10 sm:my-20 sm:h-auto sm:w-3/4 sm:rounded-lg sm:px-10 md:w-2/3 lg:w-3/5 xl:w-2/5">
      <header className="flex flex-col items-center py-4">
        <div
          className="mb-1 rounded-full bg-slate-300"
          style={{ width: "calc(2.5rem + 1vw)" }}
        >
          <img src={logo} alt="logo" className="h-auto max-w-full" />
        </div>
        <h1 className="text-center text-3xl font-extrabold text-white sm:text-5xl">
          {title}
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AuthContainer;
