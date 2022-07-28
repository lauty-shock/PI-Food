import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getDiets } from "../../redux/actions";

import Recipe from "../Recipe/Recipe";

import "./Recipes.css";

export default function Recipes() {
  const [limit, setLimit] = useState({ min: 0, max: 8 });
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, []);

  const showRecipes = useMemo(() => {
    return [...recipes.recipe];
  }, [recipes.listener]);

  function pag(e) {
    e.preventDefault();
    const valuePag = Number(e.target.innerText);
    let min = (valuePag - 1) * 9;
    let max = valuePag * 9 - 1;
    if (valuePag === 1) {
      min = 0;
      max = 8;
    }
    setLimit({ min, max });
  }

  function paginado() {
    const TotalPag = recipes.recipe.length / 9;
    const button = [];
    for (let i = 0; i < TotalPag; i++) {
      button.push(
        <button key={i} onClick={pag}>
          {i + 1}
        </button>
      );
    }
    return button;
  }
  return (
    <>
      {recipes &&
        showRecipes.map((r, index) => {
          if (index <= limit.max && index >= limit.min) {
            return (
              <div key={r.id}>
                <Recipe
                  key={r.id}
                  id={r.id}
                  title={r.title}
                  image={r.image}
                  diets={r.diets}
                  dishTypes={r.dishTypes}
                  summary={r.summary}
                  healthScore={r.healthScore}
                  analyzedInstructions={r.analyzedInstructions}
                />
              </div>
            );
          }
        })}
      {paginado()}
    </>
  );
}
