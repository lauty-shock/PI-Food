import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Detail.css";

export default function Detail() {
  const details = useSelector((state) => state.detail);
  return (
    // <div className="detail">
    //   <div className="detail-div">
    //     <div className="detail-div-img">
    //       <img className="detail-img" src={details.image} alt="Food image" />
    //     </div>

    //     <div className="">
    //       <h1 className="detail-title">{details.title}</h1>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="detail">
        <div className="detail-div">
          <div className="detail-div-btn">
            <div className="btn">
              <Link to="/home">
                <button className="detail-btn">
                  <h6 className="detail-h6">BACK</h6>
                </button>
              </Link>
            </div>
            <h1>{details.title}</h1>
            <div className="data">
              <div className="detail-data">
                <p className="detail-p">
                  <h3 className="detail-h3">Dish types: </h3>
                  {details.dishTypes}
                </p>
              </div>
              <div className="detail-data">
                <p className="detail-p">
                  <h3 className="detail-h3">Diets types: </h3>
                  {details.diets}
                </p>
              </div>
              <div className="detail-data">
                <p className="detail-p">
                  <h3 className="detail-h3">Health Score: </h3>
                  {details.healthScore}
                </p>
              </div>
            </div>
          </div>

          <div className="detail-div-img">
            <img className="detail-img" src={details.image} alt="Food image" />
          </div>

          {details.summary && (
            <p className="detail-p">
              <h3 className="detail-h3">Summary: </h3>
              {details.summary.replace(/<\/?[^>]+(>|$)/g, " ")}
            </p>
          )}
          {details.instructions && (
            <p className="detail-p">
              <h3 className="detail-h3">Instructions: </h3>
              {details.instructions.replace(/<\/?[^>]+(>|$)/g, " ")}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
