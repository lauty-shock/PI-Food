import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { detailRecipe } from "../../redux/actions";

import "./Recipe.css";

export default function Recipe({ id, title, image, diets, healthScore }) {
  const dispatch = useDispatch();

  diets = diets.map((d, i) => {
    if(diets.length -1 === i){
      return `${d}`
    }
    return `${d}, `
  })

  function detail() {
    dispatch(detailRecipe(id));
  }

  return (
    <>
      <div>
        <Link className="recipe-link" onClick={detail} to="/detail">
          <img
            className="recipe-img"
            src={image}
            height="140vh"
            alt="Image recipe"
          />
          <h3 className="recipe-title">{title}</h3>
        </Link>
      </div>
      <div className="recipe-low">
        <div className="recipe-diets">
          Diets:<br />{diets}
        </div>
        <div className="recipe-score">
          healthScore:<br />{healthScore}
        </div>
      </div>
    </>
  );
}
