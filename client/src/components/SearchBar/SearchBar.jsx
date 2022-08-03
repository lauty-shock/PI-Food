import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../../redux/actions";

import "./SearchBar.css"

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
      className="searchBar"
        type="text"
        placeholder="Search Recipe..."
        value={recipe}
        onChange={(e) => handleInput(e)}
      />
    </>
  );
}

export default SearchBar;
