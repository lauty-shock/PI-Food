import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Nav from "../Nav/Nav";
import Recipes from "../Recipes/Recipes";
import Filters from "../Filters/Filters";
import "./Home.css";
import { detailRecipe } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailRecipe("null"));
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home-div1">
        <Nav />
      </div>
      <div className="home-div2">
        <Recipes />
      </div>
      <div className="home-div3">
        <Filters />
      </div>
    </div>
  );
}
