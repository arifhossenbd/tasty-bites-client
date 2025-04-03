import { Link, NavLink } from "react-router-dom";
import { links } from "../../utils/links";
import { transitionNoDelay } from "../../hooks/useTransition";
import { FiArrowRightCircle } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, signOut, loading } = useAuth();
  const link = links?.map((link) => (
    <li key={link.id}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `text-stone-500 ${transitionNoDelay}`
            : `hover:text-stone-500 ${transitionNoDelay}`
        }
        to={link?.path}
      >
        {link?.name}
      </NavLink>
    </li>
  ));
  return (
    <div className="">
      <div className="navbar bg-base-100 shadow-sm flex items-center justify-between gap-2 md:gap-0 px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
        <div className="dropdown dropdown-hover lg:hidden">
          <div tabIndex={0} role="button" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <div>
          <NavLink to="/" className={`text-3xl font-yesterYear`}>
            Tasty Bites
          </NavLink>
        </div>
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-3">{link}</ul>
        </div>
        <div className="">
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end dropdown-hover relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />{" "}
                  </svg>
                  <span className="absolute -top-1/2 -right-1/2">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <div className="w-10 rounded-full bg-stone-500 h-10 skeleton"></div>
            ) : (
              <div>
                {user ? (
                  <div className="dropdown dropdown-end dropdown-hover">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      {loading ? (
                        <div className="w-10 rounded-full bg-stone-500 h-10 skeleton"></div>
                      ) : (
                        <div className="w-10 rounded-full">
                          <img src={user?.photoURL} alt={user?.displayName} />
                        </div>
                      )}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li>
                        <Link to="/my-foods">My Foods</Link>
                      </li>
                      <li>
                        <Link to="/add-food">Add Food</Link>
                      </li>
                      <li>
                        <Link to="/my-orders">My Orders</Link>
                      </li>
                      <li>
                        <Link className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li>
                        <button onClick={() => signOut()}>Sign Out</button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/sign-in"
                      className={`${transitionNoDelay} hover:text-stone-500 font-semibold flex items-center gap-1 group`}
                    >
                      <FiArrowRightCircle
                        className={`${transitionNoDelay} group-hover:translate-x-0 hover:text-stone-600 group-hover:opacity-100 -translate-x-1 opacity-0`}
                      />
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
