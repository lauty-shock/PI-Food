import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import css from "./Detail.module.css";

export default function Detail() {
  const details = useSelector((state) => state.detail);

  return (
    <div className={css.detail}>
      <Link to="/home">
        <button className={css.detailBtn}>
          <h6>BACK</h6>
        </button>
      </Link>

      <div className={css.detailDiv}>
        <div className={css.detailDivTop}>
          <img src={details.image} alt="recipe" className={css.detailImage} />
          <div className={css.detailDivTopRigth}>
            <h1 className={css.detailTitle}>{details.title}</h1>
            <div className={css.detailHealthScore}>
              <h3 className={css.detailTitle}>Health Score:</h3>
              <p>{details.healthScore}</p>
            </div>
            <h3 className={css.detailTitle}>Dish Types:</h3>
            {details.dishTypes}
            <h3 className={css.detailTitle}>Diet Types:</h3>
            {details.diets &&
              details.diets.map((e, i) => {
                return <li key={i}>{e}</li>;
              })}
          </div>
        </div>

        <h3 className={css.detailTitleLow}>Summary:</h3>
        <div className={css.divData}>
          {details.summary && (
            <p className={css.detailP}>
              {details.summary.replace(/<\/?[^>]+(>|$)/g, " ")}
            </p>
          )}
        </div>

        <h3 className={css.detailTitleLow}>Instructions:</h3>
        <div className={css.divData}>
          {details.instructions && (
            <p className={css.detailP}>
              {details.instructions.replace(/<\/?[^>]+(>|$)/g, " ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
