import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import css from "./Detail.module.css";

export default function Detail() {
  const details = useSelector((state) => state.detail);
  if (details.diets <= 0) {
    details.diets = ["Not specified"];
  }

  return (
    <div className={css.container}>
      <Link className={css.detailBtn} to="/home">
        <h6>BACK</h6>
      </Link>

      <div className={css.detail}>
        <div className={css.columLeft}>
          <h1 className={css.title}>{details.title}</h1>
          <section className={css.info}>
            <div className={css.data}>
              <h3 className={css.typeTitle}>Dish Types</h3>
              <ul className={css.containerType}>
                {details.dishTypes &&
                  details.dishTypes.map((e, i) => {
                    return (
                      <li className={css.type} key={i}>
                        {e}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={css.data}>
              <h3 className={css.typeTitle}>Diet Types</h3>
              <ul className={css.containerType}>
                {details.diets &&
                  details.diets.map((e, i) => {
                    return (
                      <li className={css.type} key={i}>
                        {e}
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className={css.containerHealthScore}>
              <h3 className={css.typeTitle}>Health Score</h3>
              <span className={css.healthScore}>{details.healthScore}</span>
            </div>
          </section>

          <h3 className={css.detailTitleLow}>Instructions:</h3>
          <div className={css.divData}>
            {details.instructions && (
              <p className={css.detailP}>
                {details.instructions.replace(/<\/?[^>]+(>|$)/g, " ")}
              </p>
            )}
          </div>
        </div>

        <div className={css.columRigth}>
          <img src={details.image} alt="recipe" className={css.detailImage} />
          <h3 className={css.detailTitleLow}>Summary:</h3>
          <div className={css.divData}>
            {details.summary && (
              <p className={css.detailP}>
                {details.summary.replace(/<\/?[^>]+(>|$)/g, " ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
