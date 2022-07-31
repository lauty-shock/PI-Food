import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getDiets } from "../../redux/actions";

import Recipe from "../Recipe/Recipe";

import "./Recipes.css";

export default function Recipes() {
  const [limit, setLimit] = useState({ min: 0, max: 8 }); //Limite de recetas a mostrar por página
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, []);

  const showRecipes = useMemo(() => {
    setLimit({ min: 0, max: 8 });
    return [...recipes.recipe]; //Cada que se actualice me devuelve una copia de las recetas actualizadas
  }, [recipes.listener]); //Esta atento a si se actualiza el estado global de "recipes"

  function pag(e) {
    //Muestro nueve recetas diferentes en cada página
    e.preventDefault();
    const valuePag = Number(e.target.innerText);
    let min = (valuePag - 1) * 9;
    let max = valuePag * 9 - 1; //"-1" porque se comienza en el indice "0"
    if (valuePag === 1) {
      min = 0;
      max = 8;
    }
    setLimit({ min, max });
  }

  function paginado() {
    const TotalPag = recipes.recipe.length / 9; //Divido el total de recetas en 9 (para la cantidad de paginados)
    const button = [];
    for (let i = 0; i < TotalPag; i++) {
      //Creo un "button" por cada paginado y lo pusheo al array "button"
      button.push(
        <button key={i} onClick={pag}>
          {i + 1}
        </button>
      );
    }
    return button; //Va a retornar todos los buttons creados
  }
  return (
    <>
      <div className="recipes-div">
        {recipes &&
          showRecipes.map((r, index) => {
            if (r.title === "No name") {
              // Pregunto por el obj en caso de error
              return <h1>{r.summary}</h1>;
            }
            if (r.title === "No diet") {
              return <h1>{r.summary}</h1>;
            } else if (index <= limit.max && index >= limit.min) {
              return (
                <div key={r.id} className="cards">
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
      </div>

      <div className="paginado">{paginado()}</div>
    </>
  );
}
