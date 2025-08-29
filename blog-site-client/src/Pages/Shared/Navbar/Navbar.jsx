import { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out");
      })
      .catch((err) => console.error(err));
  };

  // handle protected nav
  const handleProtectedNav = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/loginRequired", { state: { from: location } });
    }
  };

  const links = (
    <ul className="flex text-[17px] font-semibold gap-x-3">
      <NavLink to="/"><li>Home</li></NavLink>

      {/* Protected: Create Blogs */}
      <NavLink to="/createBlogs" onClick={(e) => handleProtectedNav(e, "/createBlogs")}>
        <li>Create Blogs</li>
      </NavLink>

      {/* Protected: My Blogs */}
      <NavLink to="/myBlogs" onClick={(e) => handleProtectedNav(e, "/myBlogs")}>
        <li>My Blogs</li>
      </NavLink>

      <NavLink to="/allBlogs"><li>All Blogs</li></NavLink>
    </ul>
  );

  return (
    <div className="mx-10">
      <div className="navbar bg-base-100">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl italic font-bold">DevsAround</a>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          {links}
        </div>

        {/* Right */}
        <div className="navbar-end">
          {user ? (
            <button onClick={handleSignOut} className="btn hover:bg-black hover:text-white">Sign Out</button>
          ) : (
            <>
              <Link to="/signIn">
                <button className="btn mr-2 hover:bg-black hover:text-white">Sign In</button>
              </Link>
              <Link to="/signUp">
                <button className="btn hover:bg-black hover:text-white">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
