import React from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router-dom";
import "../Style/PageLayout.css";

const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
