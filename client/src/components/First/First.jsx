import React from "react";
import { Link } from "react-router-dom";

import css from "./First.module.css";

export default function First() {
  return (
    <div className={css.leadingPage}>
      <div className={css.left}>
        <h1>Recipe book</h1>
        <section>
          <h5>Enjoy the healthiest foods</h5>
          <Link to="/home">
            <input
              className={css.firstButton}
              type="button"
              value="Let's Cook"
            />
          </Link>
        </section>
      </div>

      <div className={css.rigth}>
        <div className={css.imagen}>
          <img
            src="https://cookit-app.vercel.app/static/media/img5.e7c1868d.jpg"
            alt="img"
          />
          <span className={css.textImg}>Best vegetarian recipes</span>
        </div>
      </div>
    </div>
  );
}
