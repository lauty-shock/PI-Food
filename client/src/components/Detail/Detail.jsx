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
        <h3 className="detail-h3">Dish types: {details.dishTypes}</h3>
        <h3 className="detail-h3">Diets types: {details.diets}</h3>
        {details.summary && <p className="detail-p"><h3 className="detail-h3">Summary: </h3>{details.summary.replace(/<\/?[^>]+(>|$)/g, ' ')}</p>}
        <h3 className="detail-h3">Health Score: {details.healthScore}</h3>
        {details.instructions && <p className="detail-p"><h3 className="detail-h3">Instructions: </h3>{details.instructions.replace(/<\/?[^>]+(>|$)/g, ' ')}</p>}
      </div>
    </div>
  );
}
