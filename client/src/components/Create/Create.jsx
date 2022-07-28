import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useNavigate }  from 'react-router-dom'
import { createRecipe } from "../../redux/actions";

import "./Create.css";

export default function Create() {
  const [input, setInput] = useState({
    // title: "AASopa con choolate",
    title: "",
    image: "",
    dishTypes: "",
    // summary: "Una sopa de veduras",
    summary: "",
    healthScore: 1,
    instructions: "",
    diets: [],
  });
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  // const history = useNavigation()

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
    <div>
      <h1>Hello Create</h1>
      <form onSubmit={validation}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={(e) => handleInput(e)}
        />{" "}
        <br />
        <label>Image: </label>
        <input
          type="text"
          name="image"
          value={input.image}
          onChange={(e) => handleInput(e)}
        />{" "}
        <br />
        <label>Summary: </label>
        <input
          type="text"
          name="summary"
          value={input.summary}
          onChange={(e) => handleInput(e)}
        />{" "}
        <br />
        <label>Dish types</label>
        <input
          type="text"
          name="dishTypes"
          value={input.dishTypes}
          onChange={(e) => handleInput(e)}
        />{" "}
        <br />
        <label>Health Score: </label>
        <input
          type="number"
          name="healthScore"
          value={input.healthScore}
          onChange={(e) => handleInput(e)}
        />{" "}
        <br />
        <label>Instructions: </label>
        <textarea
          name="instructions"
          value={input.instructions}
          onChange={(e) => handleInput(e)}
          cols="30"
          rows="5"
        ></textarea>{" "}
        <br />
        <select onChange={addDiets}>
          <option>Add diet type</option>
          {selectDiets()}
        </select>{" "}
        <br />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}
