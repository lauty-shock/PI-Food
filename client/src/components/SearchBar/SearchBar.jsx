import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../../redux/actions";

import css from "./SearchBar.module.css";

function SearchBar() {
  const [recipe, setRecipe] = useState("");
  const dispatch = useDispatch();

  function handleInput(e) {
    e.preventDefault();
    setRecipe(e.target.value);
    dispatch(searchRecipes(e.target.value));
  }

  return (
    <>
      <input
        className={css.searchBar}
        type="text"
        placeholder="Search Recipe..."
        value={recipe}
        onChange={(e) => handleInput(e)}
      />
    </>
  );
}

export default SearchBar;
