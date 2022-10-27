import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { detailRecipe } from "../../redux/actions";

import css from "./Recipe.module.css";

export default function Recipe({ id, title, image, diets, summary }) {
  const dispatch = useDispatch();

  diets = diets.map((d, i) => {
    if (diets.length - 1 === i) {
      return `${d}`;
    }
    return `${d}`;
  });

  function detail() {
    dispatch(detailRecipe(id));
  }

  return (
    <Link className={css.container} onClick={detail} to="/detail">
      <img className={css.image} src={image} alt="ImageRecipe" />

      <div className={css.data}>
        <h3 className={css.title}>{title}</h3>
        <div className={css.diets}>
          {diets?.map((D, index) => {
            return (
              <span className={css.diet} key={index}>
                {D}
              </span>
            );
          })}
        </div>
        <span className={css.summary}>
          {summary.replace(/<\/?[^>]+(>|$)/g, " ")}
        </span>
      </div>
    </Link>
  );
}
