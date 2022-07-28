import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/favicon.ico";

import SearchBar from "../SearchBar/SearchBar";

import "./Nav.css";

function Nav() {
  return (
    <nav>
      <img src={Logo} alt="Logo de food" />
      <SearchBar />
      <Link to="/create">
        <button>Create Recipe</button>
      </Link>
    </nav>
  );
}

export default Nav;
