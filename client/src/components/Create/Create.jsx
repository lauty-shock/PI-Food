import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe } from "../../redux/actions";

import "./Create.css";

export default function Create() {
  const [input, setInput] = useState({
    title: "",
    image: "",
    dishTypes: "",
    summary: "",
    healthScore: 1,
    instructions: "",
    diets: [],
  });
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

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

  function addDiets(e) {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }

  function handleInput(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function validation(e) {
    if (input.title.length <= 0) {
      e.preventDefault();
      return alert("mandatory title");
    }
    if (input.summary.length <= 0) {
      e.preventDefault();
      return alert("mandatory summary");
    }
    if (input.healthScore < 1 || input.healthScore > 100) {
      e.preventDefault();
      return alert("health score cannot be lower than 1 or higher than 100");
    }
    if (input.diets.length <= 0) {
      e.preventDefault();
      return alert("You must select at least one diet");
    }
    if (input.image.length <= 0)
      setInput({
        ...input,
        ["image"]: "https://cdn-icons-png.flaticon.com/512/1256/1256423.png",
      });
    e.preventDefault();
    dispatch(createRecipe(input));
    window.history.back();
    alert("recipe created successfully");
  }

  return (
    <div className="create">
      <form className="create-form" onSubmit={validation}>
        <div className="create-div1">
          <h1>Create recipe</h1>
          <label>Image: </label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="create-div2">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="create-div3">
          <label>Dish types: </label>
          <input
            type="text"
            name="dishTypes"
            value={input.dishTypes}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="create-div4">
          <select onChange={addDiets}>
            <option>Add diet type</option>
            {selectDiets()}
          </select>
        </div>
        <div className="create-div5">
          <label>Health Score: </label>
          <input
            type="number"
            name="healthScore"
            value={input.healthScore}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="create-div6">
          <label>Summary: </label>
          <textarea
            name="summary"
            value={input.summary}
            onChange={(e) => handleInput(e)}
            cols="30"
            rows="5"
          />
        </div>
        <div className="create-div7">
          <label>Instructions: </label>
          <textarea
            name="instructions"
            value={input.instructions}
            onChange={(e) => handleInput(e)}
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div className="create-div8">
          <input type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
}
