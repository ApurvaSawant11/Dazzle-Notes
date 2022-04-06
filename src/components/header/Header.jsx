import React, { useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import {
  logo,
  ProfileIcon,
  HamburgerIcon,
  SunIcon,
  MoonIcon,
  GithubIcon,
} from "../../assets";
import { useAuth, useTheme } from "../../context";
import { SearchBar } from "../searchBar/SearchBar";
import { useWindowSize } from "../../hooks";

const Header = ({ barCollapse, setBarCollapse }) => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const { changeTheme, theme } = useTheme();

  useEffect(() => {
    if (width < 1024 && width > 620) {
      setBarCollapse({ collapse: true, showSidebar: true });
    } else if (width < 620) {
      setBarCollapse({ collapse: false, showSidebar: false });
    } else {
      setBarCollapse({ collapse: false, showSidebar: true });
    }
  }, [width]);

  const collapseHandler = () => {
    if (width < 620) {
      setBarCollapse({
        collapse: false,
        showSidebar: !barCollapse.showSidebar,
      });
    } else {
      setBarCollapse({ collapse: !barCollapse.collapse, showSidebar: true });
    }
  };

  return (
    <header className="flex-row p-0p5 border-bottom-1">
      <div className="flex-row-center">
        {user && (
          <HamburgerIcon
            size={25}
            onClick={collapseHandler}
            className="hamburger-icon icon"
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
      </div>
      <div className="flex-row-center">
        {user && <SearchBar />}
        {user ? (
          <div>
            <a
              href="https://github.com/ApurvaSawant11"
              classname="icon"
              target="_blank"
            >
              <GithubIcon size={32} className="mr-1 github-icon" />
            </a>
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
        <div onClick={changeTheme}>
          {theme === "night" ? (
            <SunIcon size="2rem" className="icon" />
          ) : (
            <MoonIcon size="2rem" className="icon" />
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
