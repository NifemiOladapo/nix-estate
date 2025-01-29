import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice.js";

const Header = () => {
  const { currentUser } = useSelector((state) => (state as any).user);
  const dispatch = useDispatch();
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
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                src={currentUser.profilePicture}
                alt="profile-image"
                className="rounded-full h-7 w-7 object-cover"
              />
            </Link>
          ) : (
            <Link to={"sign-in"}>
              <li className=" hover:underline pointer">Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
