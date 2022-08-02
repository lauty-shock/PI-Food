import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [errors, setErrors] = useState({});
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  function validateError(input) {
    let errors = {};
    if (!input.title) {
      errors.title = "Title is required";
    } else if (!/^[a-zA-Z\s]+$/.test(input) && input.title.length < 4) {
      //Debo solucionar las expresiones regulares
      errors.title = "Title is invalid";
    }

    if (!input.summary) {
      errors.summary = "Summary is required";
    } else if (!/^[a-zA-Z\s]+$/.test(input) && input.summary.length < 4) {
      //Debo solucionar las expresiones regulares
      errors.summary = "Summary is invalid";
    }

    if (!input.image) {
      errors.image = "Missing image url";
    }
    if (!input.dishTypes) {
      errors.dishTypes = "Complete dish type";
    }
    if (!input.instructions) {
      errors.instructions = "Complete instructions";
    }

    if (input.healthScore < 1 || input.healthScore > 100) {
      errors.healthScore = "Value must be between 1 - 100";
    }

    return errors;
  }

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

  function showDiets() {
    const pDiets = input.diets.map((d) => {
      return <p key={d}>{d}</p>;
    });

    console.log(pDiets);
    return pDiets;
  }

  function addDiets(e) {
    if (!input.diets.includes(e.target.value)) {
      console.log(e.target.value)
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
    showDiets();
  }
  ////////////////////////////////////////////////////
  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateError({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function validation(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0 || input.title.length < 4)
      return alert("Fill in the missing fields");
    if (input.diets.length <= 0) return alert("select a diet at least");
    else {
      console.log("LLEGA");
      console.log(input);
      dispatch(createRecipe(input));
      console.log("PASA");
      window.history.back();
      alert("recipe created successfully");
    }
  }

  return (
    <div className="create">
      <form className="create-form" onSubmit={validation}>
        <div className="create-div1">
          <h1>Create recipe</h1>
          <label>Image: </label>
          <input
            className={errors.image && "input-danger"}
            type="url"
            name="image"
            value={input.image}
            onChange={(e) => handleInput(e)}
          />
          {errors.image && <p className="p-danger">{errors.image}</p>}
        </div>

        <div className="create-div2">
          <label>Title: </label>
          <input
            className={errors.title && "input-danger"}
            type="text"
            name="title"
            value={input.title}
            onChange={handleInput}
          />
          {errors.title && <p className="p-danger">{errors.title}</p>}
        </div>

        <div className="create-div3">
          <label>Dish types: </label>
          <input
            className={errors.dishTypes && "input-danger"}
            type="text"
            name="dishTypes"
            value={input.dishTypes}
            onChange={(e) => handleInput(e)}
          />
          {errors.dishTypes && <p className="p-danger">{errors.dishTypes}</p>}
        </div>

        <div className="create-div4">
          <select onChange={addDiets}>
            <option>Add diet type</option>
            {selectDiets()}
          </select>
          {input.diets.map((d) => {
            return d;
          })}
        </div>

        <div className="create-div5">
          <label>Health Score: </label>
          <input
            className={errors.healthScore && "input-danger"}
            type="number"
            name="healthScore"
            value={input.healthScore}
            onChange={(e) => handleInput(e)}
          />
          {errors.healthScore && (
            <p className="p-danger">{errors.healthScore}</p>
          )}
        </div>

        <div className="create-div6">
          <label>Summary: </label>
          <textarea
            className={errors.summary && "input-danger"}
            name="summary"
            value={input.summary}
            onChange={handleInput}
            cols="30"
            rows="5"
          />
          {errors.summary && <p className="p-danger">{errors.summary}</p>}
        </div>

        <div className="create-div7">
          <label>Instructions: </label>
          <textarea
            className={errors.instructions && "input-danger"}
            name="instructions"
            value={input.instructions}
            onChange={(e) => handleInput(e)}
            cols="30"
            rows="5"
          />
          {errors.instructions && (
            <p className="p-danger">{errors.instructions}</p>
          )}
        </div>

        <div className="create-div8">
          <input type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
}
