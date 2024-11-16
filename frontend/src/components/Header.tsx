import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-3 w-full mx-auto">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Nix</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            className="bg-transparent outline-none w-24 sm:w-64"
            placeholder="Search ..."
          />
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline hover:underline pointer">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className=" hover:underline pointer">About</li>
          </Link>
          <Link to={"sign-in"}>
            <li className=" hover:underline pointer">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
