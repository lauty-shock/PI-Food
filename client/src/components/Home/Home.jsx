import React from "react";
// import { Link } from "react-router-dom";

import Nav from "../Nav/Nav";
import Recipes from "../Recipes/Recipes";
import Filters from "../Filters/Filters";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="home-div1">
        <Nav />
      </div>
      <div className="home-div2">
        <Filters />
      </div>
      <div className="home-div3">
        <Recipes />
      </div>
    </>
  );
}
