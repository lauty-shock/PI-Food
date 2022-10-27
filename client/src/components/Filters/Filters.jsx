import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDiets,
  filterOrder,
  filterOrderScore,
  getAllRecipes,
  getDiets,
} from "../../redux/actions";

import css from "./Filters.module.css";

export default function Filters() {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  const orderName = useRef();
  const orderScore = useRef();

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
    orderScore.current.value = "all";
  }

  function fillOrderScore(e) {
    dispatch(filterOrderScore(e.target.value));
    orderName.current.value = "all";
  }

  return (
    <div className={css.filterDiv}>
      <select className={css.filterSelect} defaultValue="all" onChange={filldiets}>
        <option className="option" value="all">
          Select diet
        </option>
        {selectDiets()}
      </select>

      <select
        className={css.filterSelect}
        defaultValue="all"
        onChange={fillOrder}
        ref={orderName}
      >
        <option value="all">Select order</option>
        <option value="upward">A - Z</option>
        <option value="descendant">Z - A</option>
      </select>

      <select
        className={css.filterSelect}
        defaultValue="all"
        onChange={fillOrderScore}
        ref={orderScore}
      >
        <option value="all">Select order score</option>
        <option value="upward">1 - 100</option>
        <option value="descendant">100 - 1</option>
      </select>
    </div>
  );
}
