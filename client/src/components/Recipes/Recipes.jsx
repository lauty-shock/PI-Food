import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getDiets } from "../../redux/actions";

import Recipe from "../Recipe/Recipe";

import css from "./Recipes.module.css";

export default function Recipes() {
  const [limit, setLimit] = useState({ min: 0, max: 5 }); //Limite de recetas a mostrar por página
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  const showRecipes = useMemo(() => {
    setLimit({ min: 0, max: 5 });
    return [...recipes.recipe]; //Cada que se actualice me devuelve una copia de las recetas actualizadas
  }, [recipes.recipe]); //Esta atento a si se actualiza el estado global de "recipes"

  function pag(e) {
    //Muestro nueve recetas diferentes en cada página
    e.preventDefault();
    const valuePag = Number(e.target.innerText);
    let min = (valuePag - 1) * 6;
    let max = valuePag * 6 - 1; //"-1" porque se comienza en el indice "0"
    if (valuePag === 1) {
      min = 0;
      max = 5;
    }
    setLimit({ min, max });
  }

  function pagBack(e) {
    e.preventDefault();
    let min = limit.min - 6;
    let max = limit.max - 6;
    if (min < 0) {
      min = 0;
      max = 5;
    }
    setLimit({ min, max });
  }

  function pagNext(e) {
    e.preventDefault();

    let last = Math.ceil(recipes.recipe.length / 6) * 6 - 1;

    let min = limit.min + 6;
    let max = limit.max + 6;

    if (limit.max >= last && limit.min >= last - 6) {
      min = limit.min;
      max = limit.max;
    }

    setLimit({ min, max });
  }

  function paginado() {
    const TotalPag = recipes.recipe.length / 6; //Divido el total de recetas en 9 (para la cantidad de paginados)
    const button = [];
    button.push(
      <button className={css.paginadoBtn} key="back" onClick={pagBack}>
        {"<"}
      </button>
    );
    for (let i = 0; i < TotalPag; i++) {
      //Creo un "button" por cada paginado y lo pusheo al array "button"
      button.push(
        <button className={css.paginadoBtn} key={i} onClick={pag}>
          {i + 1}
        </button>
      );
    }
    button.push(
      <button className={css.paginadoBtn} key="next" onClick={pagNext}>
        {">"}
      </button>
    );
    return button; //Va a retornar todos los buttons creados
  }
  return (
    <>
      <div className={css.recipesDiv}>
        {recipes &&
          showRecipes?.map((r, index) => {
            if (r.title === "No name") {
              // Pregunto por el obj en caso de error
              return <h1 key={index}>{r.summary}</h1>;
            }
            if (r.title === "No diet") {
              return <h1 key={index}>{r.summary}</h1>;
            } else if (index <= limit.max && index >= limit.min) {
              return (
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
              );
            }
            return "";
          })}
      </div>

      <div className={css.paginado}>{paginado()}</div>
    </>
  );
}
