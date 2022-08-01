import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDiets,
  filterOrder,
  filterOrderScore,
  getAllRecipes,
  getDiets,
} from "../../redux/actions";

import "./Filters.css";

export default function Filters() {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  function filldiets(e) {
    dispatch(filterDiets(e.target.value));
  }

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  function selectDiets() {
    const options = [];
    diets.map((d) =>
      options.push(
        <option key={d.id} value={d.tipo}>
          {d.tipo}
        </option>
      )
    );
    return options;
  }

  function fillOrder(e) {
    dispatch(filterOrder(e.target.value));
  }

  function fillOrderScore(e) {
    dispatch(filterOrderScore(e.target.value));
  }

  return (
    <div className="Filter-div">
      <select className="filter-select" defaultValue="all" onChange={filldiets}>
        <option className="option" value="all">
          Select diet
        </option>
        {selectDiets()}
      </select>
      <select className="filter-select" defaultValue="all" onChange={fillOrder}>
        <option value="all">Select order</option>
        <option value="upward">A - Z</option>
        <option value="descendant">Z - A</option>
      </select>
      <select
        className="filter-select"
        defaultValue="all"
        onChange={fillOrderScore}
      >
        <option value="all">Select order score</option>
        <option value="upward">1 - 100</option>
        <option value="descendant">100 - 1</option>
      </select>
    </div>
  );
}
