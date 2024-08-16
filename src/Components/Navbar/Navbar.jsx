import React, { useContext, useEffect } from "react";
import logo from "./../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../Context/User.context";
import { cartContext } from "../../Context/Cart.context";
import { wishlistContext } from '../../Context/WishList.context';

export default function Navbar() {
  const { token, logout } = useContext(userContext);
  const { cartInfo, getCartInfo } = useContext(cartContext);
  const { wishListInfo, getWishListInfo } = useContext(wishlistContext);

  useEffect(() => {
    getCartInfo();
    getWishListInfo();
  }, []);

  return (
    <>
      <nav className="bg-slate-100 p-3 fixed top-0 left-0 right-0 z-10">
        <div className="container flex gap-8">
          <h1>
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </h1>

          {token ? (
            <ul className="flex gap-6 items-center">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1
                       ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1
                       ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1
                       ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1
                       ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1
                       ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : null}

          {token ? (
            <Link to="/cart" className="relative">
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              <span className="absolute rounded-full bg-primary w-5 h-5 text-sm text-white font-semibold flex justify-center items-center -translate-y-1/2 translate-x-1/2 top-0 right-0">
                {cartInfo === null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  cartInfo.numOfCartItems || 0
                )}
              </span>
            </Link>
          ) : null}

          {token ? (
            <Link to="/wishList" className="relative ms-auto">
              <i className="fa-solid fa-heart text-lg"></i>
              <span className="absolute rounded-full bg-primary w-5 h-5 text-sm text-white font-semibold flex justify-center items-center -translate-y-1/2 translate-x-1/2 top-0 right-0">
                {wishListInfo === null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  Array.isArray(wishListInfo) ? wishListInfo.length : 0
                )}
              </span>
            </Link>
          ) : null}

          <ul className="flex gap-6 items-center">
            <li>
              <a href="https://www.facebook.com">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>

          <ul className="flex gap-6 items-center">
            {!token ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1
                       ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/auth/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1
                       ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                    }}
                    to="/auth/signup"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="cursor-pointer">
                <span onClick={logout}>
                  <i className="fa-solid fa-arrow-right-from-bracket text-2xl"></i>
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

