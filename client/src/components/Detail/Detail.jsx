import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import s from "./Detail.module.css";

export default function Detail() {
  const details = useSelector((state) => state.detail);

  return (
    <div className={s.detail}>
      <Link to="/home">
        <button className={s.detailBtn}>
          <h6>BACK</h6>
        </button>
      </Link>

      <div className={s.detailDiv}>
        <div className={s.detailDivTop}>
          <img src={details.image} alt="recipe" className={s.detailImage} />
          <div className={s.detailDivTopRigth}>
            <h1 className={s.detailTitle}>{details.title}</h1>
            <div className={s.detailHealthScore}>
              <h3 className={s.detailTitle}>Health Score:</h3>
              <p>{details.healthScore}</p>
            </div>
            <h3 className={s.detailTitle}>Dish Types:</h3>
            {details.dishTypes}
            <h3 className={s.detailTitle}>Diet Types:</h3>
            {details.diets &&
              details.diets.map((e, i) => {
                return <li key={i}>{e},</li>;
              })}
          </div>
        </div>

        <h3 className={s.detailTitleLow}>Summary:</h3>
        {details.summary && (
          <p className={s.detailP}>
            {details.summary.replace(/<\/?[^>]+(>|$)/g, " ")}
          </p>
        )}
        <h3 className={s.detailTitleLow}>Instructions:</h3>
        {details.instructions && (
          <p className={s.detailP}>
            {details.instructions.replace(/<\/?[^>]+(>|$)/g, " ")}
          </p>
        )}
      </div>
    </div>
  );
}
