import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Recipes from "../Recipes/Recipes";
import Filters from "../Filters/Filters";
import css from "./Home.module.css";
import { detailRecipe } from "../../redux/actions";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

export default function Home() {
  const recipes = useSelector((state) => state.recipes);
  const [spiner, setSpiner] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailRecipe("null"));
  }, [dispatch]);

  useEffect(() => {
    if (recipes.recipe.length > 0) {
      setSpiner(false);
    } else {
      setSpiner(true);
    }
  }, [recipes.recipe]);

  return (
    <>
      {spiner ? (
        <Spinner />
      ) : (
        <>
          <div className={css.home}>
            <div className={css.homeDiv1}>
              <Nav />
            </div>
            <div className={css.homeDiv2}>
              <Recipes />
            </div>
            <div className={css.homeDiv3}>
              <Filters />
            </div>
          </div>
        </>
      )}
    </>
  );
}
