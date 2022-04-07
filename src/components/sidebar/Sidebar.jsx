import React from "react";
import "./sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { MdLabelOutline, MdLogout } from "react-icons/md";
import { BiHomeAlt, BiArchiveIn, BiTrash } from "react-icons/bi";

import "react-pro-sidebar/dist/css/styles.css";

import { useAuth } from "../../context/auth-context";

const Sidebar = ({ barCollapse }) => {
  const location = useLocation();
  const path = location.pathname;
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logOut();
      navigate("/landingpage");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      id="sidebar"
      className={`${barCollapse.showSidebar ? "" : "display-none"}`}
    >
      <ProSidebar collapsed={barCollapse.collapse}>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={path === "/" ? true : false} icon={<BiHomeAlt />}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem
              active={path === "/tags" ? true : false}
              icon={<MdLabelOutline />}
            >
              <Link to="/">Edit Tags</Link>
            </MenuItem>
            <MenuItem
              active={path === "/archive" ? true : false}
              icon={<BiArchiveIn />}
            >
              <Link to="/archive">Archive</Link>
            </MenuItem>
            <MenuItem
              active={path === "/trash" ? true : false}
              icon={<BiTrash />}
            >
              <Link to="/trash">Trash</Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<MdLogout />} onClick={logoutHandler}>
              Logout
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export { Sidebar };
