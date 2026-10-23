import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Style/Sidebar.css";
import { AuthContext } from "../context/Authcontext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logoutUser, adminName, setAdminName } = useContext(AuthContext);
  return (
    <section className="sidebar-container">
      {/* Add Items */}
      <aside className="sidebar-section">
        <div>
          <p className="sidebar-title">Add Items</p>
        </div>

        <div>
          <div className="sidebar-subitem">
            <NavLink to="/state">State</NavLink>
          </div>
          <div className="sidebar-subitem">
            <NavLink to="/Statefood">Statefood</NavLink>
          </div>
          <div className="sidebar-subitem">
            <NavLink to="/StatefoodItem">StatefoodItem</NavLink>
          </div>
        </div>
      </aside>

      {/* List Items */}
      <aside className="sidebar-section">
        <div>
          <p className="sidebar-title">List Items</p>
        </div>

        <div className="sidebar-subitem">
          <NavLink>StateList</NavLink>
        </div>
        <div className="sidebar-subitem">
          <NavLink>StatefoodList</NavLink>
        </div>
        <div className="sidebar-subitem">
          <NavLink to="/StatefoodItem">StatefoodItemList</NavLink>
        </div>
      </aside>

      {/* Orders */}
      <aside className="sidebar-section">
        <div>
          <p className="sidebar-title">Order List</p>
        </div>
        <div className="sidebar-title">
          <NavLink to="/order">Order</NavLink>
        </div>
      </aside>

      {/* Admin Name */}
      <aside className="sidebar-section">
        <p className="sidebar-title">{adminName || "Admin Name"}</p>
      </aside>

      {/* Logout */}
      <aside className="sidebar-section">
        <button
          className="logout-btn"
          onClick={() => {
            (logoutUser(null), setAdminName(null), navigate("/"));
          }}
        >
          Logout
        </button>
      </aside>
    </section>
  );
};

export default Sidebar;
