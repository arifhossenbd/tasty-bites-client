import { Link, NavLink } from "react-router-dom";
import { links } from "../../utils/links";
import { transitionNoDelay } from "../../hooks/useTransition";
import { FiArrowRightCircle } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, signOut, loading } = useAuth();
  const link = links?.map((link) => (
    <li key={link.id}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `text-yellow-500 ${transitionNoDelay}`
            : `hover:text-yellow-500 ${transitionNoDelay}`
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
          <NavLink to="/" className={`text-3xl font-yesterYear text-yellow-400`}>
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
                className="btn btn-ghost btn-circle hover:bg-yellow-50 group"
              >
                <div className="indicator">
                  <FaShoppingCart className="text-lg md:text-xl group-hover:text-yellow-500 transition-all duration-200 ease-linear" />
                  <span className="rounded-full w-5 h-5 bg-yellow-500 text-white absolute -top-3 -right-4">
                    0
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 z-1 w-52 rounded-box shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold text-stone-500">
                    Items
                  </span>
                  <span className="text-info">Subtotal: 0.00</span>
                  <div className="card-actions mt-2">
                    <button className="bg-yellow-200 btn hover:bg-yellow-100 text-yellow-700 hover:text-yellow-600 w-full transition-all duration-200 ease-in-out">
                      View Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <div className="w-10 rounded-full bg-yellow-500 h-10 skeleton"></div>
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
                        <div className="w-10 rounded-full bg-yellow-500 h-10 skeleton"></div>
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
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? `text-yellow-500 ${transitionNoDelay}`
                              : `hover:text-yellow-500 ${transitionNoDelay}`
                          }
                          to="/add-food"
                        >
                          Add Food
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? `text-yellow-500 ${transitionNoDelay}`
                              : `hover:text-yellow-500 ${transitionNoDelay}`
                          }
                          to="/my-foods"
                        >
                          My Foods
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? `text-yellow-500 ${transitionNoDelay}`
                              : `hover:text-yellow-500 ${transitionNoDelay}`
                          }
                          to="/my-orders"
                        >
                          My Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            isActive
                              ? `text-yellow-500 justify-between ${transitionNoDelay}`
                              : `hover:text-yellow-500 justify-between ${transitionNoDelay}`
                          }
                        >
                          Profile
                          <span className="badge">New</span>
                        </NavLink>
                      </li>
                      <li>
                        <Link>{user?.email}</Link>
                      </li>
                      <li>
                        <button
                          className="text-yellow-500"
                          onClick={() => signOut()}
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/sign-in"
                      className={`${transitionNoDelay} hover:text-yellow-500 font-semibold flex items-center gap-1 group`}
                    >
                      <FiArrowRightCircle
                        className={`${transitionNoDelay} group-hover:translate-x-0 hover:text-yellow-600 group-hover:opacity-100 -translate-x-1 opacity-0`}
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
