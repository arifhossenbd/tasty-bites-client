import { Link, NavLink } from "react-router-dom";
import { links } from "../../utils/links";
import { transitionNoDelay } from "../../hooks/useTransition";
import { FiArrowRightCircle } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../../pages/Cart/Cart";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const { totalQuantity, totalPrice } = useCart();
  const { currentTheme } = useTheme();
  const {
    navBgColor,
    cardBgColor,
    cardTextColor,
    inactiveBtn,
    activeBtn,
    textColor,
    activeText,
    primaryBtn,
    inactiveText,
    footerBgColor,
    footerTextColor,
  } = currentTheme;

  const link = links?.map((link) => (
    <li key={link.id}>
      <NavLink className={({ isActive }) => isActive ? `${activeText}` : `${inactiveText} transition-colors duration-200`}
        to={link?.path}
      >
        {link?.name}
      </NavLink>
    </li>
  ));

  return (
    <div
      className={`fixed z-50 top-0 w-full ${navBgColor} shadow-sm`}
    >
      <div className="navbar flex items-center justify-between gap-2 md:gap-0 px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
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
            className={`dropdown-content rounded-box z-1 w-52 p-2 shadow`}
          >
            {link}
          </ul>
        </div>
        <div>
          <NavLink to="/" className={`text-3xl font-yesterYear ${activeText}`}>
            Tasty Bites
          </NavLink>
        </div>
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-3">{link}</ul>
        </div>
        <div className="">
          <div className="flex items-center gap-3">
            <div
              className={`dropdown dropdown-end relative ${
                !isDrawerOpen && "dropdown-hover"
              }`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost hover:bg-transparent btn-circle group`}
              >
                <div className="indicator">
                  <FaShoppingCart
                    className={`text-lg md:text-xl ${footerTextColor} hover:transition-colors transition-all duration-200 ease-linear`}
                  />
                  <span
                    className={`rounded-full w-5 h-5 ${cardBgColor} ${textColor} absolute -top-3 -right-5`}
                  >
                    {totalQuantity ? totalQuantity : 0}
                  </span>
                </div>
              </div>
              {!isDrawerOpen && (
                <div
                  tabIndex={0}
                  className={`dropdown-content ${cardBgColor} ${textColor} z-1 w-52 rounded-box shadow`}
                >
                  <div className="card-body">
                    <span className={`text-lg font-bold ${textColor}`}>
                      {totalQuantity ? totalQuantity : 0} Items
                    </span>
                    <span className={`${textColor}`}>
                      Subtotal: ${totalPrice ? totalPrice.toFixed(2) : 0.0}
                    </span>
                    <div className="card-actions mt-2">
                      <button
                        onClick={() => setIsDrawerOpen(true)}
                        className={`btn ${inactiveBtn} w-full transition-all duration-200 ease-in-out`}
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isDrawerOpen && (
                <Cart
                  isOpen={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                />
              )}
            </div>
            {loading ? (
              <div
                className={`w-10 rounded-full ${textColor} h-10 skeleton`}
              ></div>
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
                        <div
                          className={`w-10 rounded-full ${textColor} h-10 skeleton`}
                        ></div>
                      ) : (
                        <div className="w-10 rounded-full">
                          <img src={user?.photoURL} alt={user?.displayName} />
                        </div>
                      )}
                    </div>
                    <ul
                      tabIndex={0}
                      className={`dropdown-content menu ${cardBgColor} ${cardTextColor} space-y-2 rounded-box z-1 w-52 p-2 shadow-sm`}
                    >
                      <li>
                        <NavLink
                          className={({ isActive }) => isActive ? `${activeBtn}` : `${textColor}`}
                            to="/add-food"
                        >
                          Add Food
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) => isActive ? `${activeBtn}` : `${textColor}`}
                          to="/my-foods"
                        >
                          My Foods
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) => isActive ? `${activeBtn}` : `${textColor}`}
                          to="/my-orders"
                        >
                          My Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) => isActive ? `${activeBtn}` : `${textColor}`}
                          to="/wishlist"
                        >
                          Wishlist
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            isActive
                              ? `${textColor} justify-between ${transitionNoDelay}`
                              : `hover:${textColor} justify-between ${transitionNoDelay}`
                          }
                        >
                          Profile
                          <span className="badge">New</span>
                        </NavLink>
                      </li>
                      <li>
                        <button
                          className={`${inactiveBtn}`}
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
                      className={`${transitionNoDelay} hover:${textColor} font-semibold flex items-center gap-1 group`}
                    >
                      <FiArrowRightCircle
                        className={`${transitionNoDelay} group-hover:translate-x-0 hover:${textColor} group-hover:opacity-100 -translate-x-1 opacity-0`}
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
