import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";

import css from "./Nav.module.css";

function Nav() {
  return (
    <nav className={css.navbar}>
      <h1>Recipe Book</h1>
      <SearchBar />
      <Link to="/create">
        <button className={css.navBtn}>Create Recipe</button>
      </Link>
    </nav>
  );
}

export default Nav;
