import React from "react";
import { Sidebar } from "../components";
import { Outlet } from "react-router";

const WithSidebar = ({ barCollapse }) => {
  return (
    <>
      <div className="flex-container">
        <Sidebar barCollapse={barCollapse} />
        <Outlet />
      </div>
    </>
  );
};

export { WithSidebar };
