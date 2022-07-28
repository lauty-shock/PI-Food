import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { detailRecipe } from "../../redux/actions";

import "./Recipe.css";

export default function Recipe({ id, title, image, diets, healthScore }) {
  const dispatch = useDispatch();

  function detail() {
    dispatch(detailRecipe(id));
  }

  return (
    <div className="hijo">
      RECETA: {title} <br />
      <Link onClick={detail} to='/detail'>
        <img src={image} alt="" /> <br />
      </Link>
      Dietas: {diets} <br />
      healthScore: {healthScore} <br />
    </div>
  );
}
