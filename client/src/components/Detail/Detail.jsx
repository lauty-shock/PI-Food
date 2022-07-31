import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Detail.css";

export default function Detail() {
  const details = useSelector((state) => state.detail);
  return (
    <div className="detail">
      <div className="detail-div">
        <Link to="/home">
          <button className="detail-btn"><h6 className="detail-h6">BACK</h6></button>
        </Link>
        <h1>{details.title}</h1>
        <img className="detail-img" src={details.image} alt="Food image" />
        <h3>Dish types: {details.dishTypes}</h3>
        <h3>Diets types: {details.diets}</h3>
        <h3>Summary: {details.summary}</h3>
        <h3>Health Score: {details.healthScore}</h3>
        <h3>Instructions: {details.instructions}</h3>
      </div>
    </div>
  );
}
