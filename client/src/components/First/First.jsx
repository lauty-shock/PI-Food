import React from "react";
import { Link } from "react-router-dom";

import "./First.css"

export default function First() {
  return (
    <>
      <h1>Henry Food</h1>
      <Link to="/home">
      <input className="first-button" type="button" value="Home" />
      </Link>
    </>
  );
}