import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div id="containerNavbar">
      <nav id="navbar">
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-button active navbar-button " : "navbar-button"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-button active navbar-button " : "navbar-button"
          }
          to="/project1"
        >
          Todo List
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-button active navbar-button " : "navbar-button"
          }
          to="/project2"
        >
          Calculator
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-button active navbar-button " : "navbar-button"
          }
          to="/project3"
        >
          Battleship
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-button active navbar-button " : "navbar-button"
          }
          to="/other"
        >
          Other
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
