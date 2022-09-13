import React from "react";
import { Link } from "react-router-dom";

import css from "./First.module.css";

export default function First() {
  return (
    <div className={css.leadingPage}>
      <section className={css.container}>
        <h1>Henry Food</h1>
        <Link to="/home">
          <input className={css.firstButton} type="button" value="Home" />
        </Link>
      </section>
    </div>
  );
}
