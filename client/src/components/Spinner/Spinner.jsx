import React from "react";

import css from "./Spinner.module.css";
import spinner from "../../img/Spinner.svg";

export default function Spinner() {
  return (
    <div className={css.containerSpinner}>
      <img className={css.spinner} src={spinner} alt="spinner" />
    </div>
  );
}
