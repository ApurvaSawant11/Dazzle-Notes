import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { logo, ProfileIcon, HamburgerIcon } from "../../assets";
import { useAuth } from "../../context";
import { SearchBar } from "../searchBar/SearchBar";
const Header = ({ barCollapse, setBarCollapse }) => {
  const collapseHandler = () => {
    barCollapse ? setBarCollapse(false) : setBarCollapse(true);
  };

  const { user } = useAuth();

  return (
    <header className="flex-row p-0p5">
      <div className="flex-row-center">
        {user && (
          <HamburgerIcon
            size={25}
            onClick={collapseHandler}
            className="hamburger-icon"
          />
        )}
        <Link
          to="/"
          className="header-logo flex-row-center fw-700 text-2xl no-underline"
        >
          <img src={logo} alt="Diamond Logo" />
          <span>DAZZLE </span>
          <span className="pl-0p5">NOTES </span>
        </Link>
        {user && <SearchBar />}
      </div>
      <div>
        {user ? (
          <div>
            <ProfileIcon size={35} className="mr-1" />
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="button  primary">Login</button>
            </Link>
            <Link
              to="/signup"
              className="secondary-text px-1 fw-700 no-underline"
            >
              SIGNUP
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
