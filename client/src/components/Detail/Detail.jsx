import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Detail.css";

export default function Detail() {
  const details = useSelector((state) => state.detail);
  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <br />
      <br />
      <h1>{details.id}</h1>
      <h1>{details.title}</h1>
      <img src={details.image} alt="Food image" />
      <br />
      <br />
      <h3>Dish types: {details.dishTypes}</h3>
      <h3>Diets types: {details.diets}</h3>
      <br />
      <h3>Summary: {details.summary}</h3>
      <h3>Health Score: {details.healthScore}</h3>
      <br />
      <h3>Instructions: {details.instructions}</h3>
    </div>
  );
}
