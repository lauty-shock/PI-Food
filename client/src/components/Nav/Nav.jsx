import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";

import "./Nav.css";

function Nav() {
  return (
    <nav>
      <h1 className="nav-h1">Food-PI-Shock</h1>
      <SearchBar />
      <Link to="/create">
        <button className="nav-btn">Create Recipe</button>
      </Link>
    </nav>
  );
}

export default Nav;
