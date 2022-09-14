import React from "react";

import css from "./Fail.module.css";

export default function Fail() {
  return (
    <div className={css.Fail}>
      <h1>Error 404</h1>
      <h1>Nonexistent Url</h1>
    </div>
  );
}
