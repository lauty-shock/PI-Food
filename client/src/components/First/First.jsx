import React from "react";
import { Link } from "react-router-dom";

import css from "./output.module.css";

export default function First() {
  return (
    <div className={css.leadingPage}>
      <div className={css.container}>
        <h1>Recipe book</h1>
        <h5>Enjoy the healthiest foods</h5>
        <Link to="/home">
          <input className={css.firstButton} type="button" value="Let's Cook" />
        </Link>
      </div>
    </div>
  );
}
