import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../redux/actions";

import "./Create.css";

export default function Create() {
  const [input, setInput] = useState({
    title: "",
    image: "",
    dishTypes: "",
    summary: "",
    healthScore: 0,
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

  // function showDiets() {
  //   const pDiets = input.diets.map((d) => {
  //     return <p key={d}>{d}</p>;
  //   });

  //   return pDiets;
  // }

  function addDiets(e) {
    if (e.target.value !== "Add diet type") {
      if (!input.diets.includes(e.target.value)) {
        setInput({
          ...input,
          diets: [...input.diets, e.target.value],
        });
      }
    }

    // showDiets();
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
      dispatch(createRecipe(input));
      window.history.back();
      alert("recipe created successfully");
    }
  }

  return (
    <div className="create">
      <h1 className="create-h1">Create recipe</h1>
      <Link to="/home">
        <button className="btn-back">
          <h6>BACK</h6>
        </button>
      </Link>
      <form className="create-form" onSubmit={validation}>
        <div className="create-div-top">
          <div className="create-div-top-left">
            <input
              className={errors.image && "input-danger"}
              type="url"
              name="image"
              value={input.image}
              onChange={(e) => handleInput(e)}
              placeholder="Enter the URL of the image"
            />
            {errors.image && <p className="p-danger">{errors.image}</p>}
          </div>

          <div className="create-div-top-rigth">
            <label>Title: </label>
            <input
              className={errors.title && "input-danger"}
              type="text"
              name="title"
              value={input.title}
              onChange={handleInput}
            />
            {errors.title && <p className="p-danger">{errors.title}</p>}

            <label>Dish types: </label>
            <input
              className={errors.dishTypes && "input-danger"}
              type="text"
              name="dishTypes"
              value={input.dishTypes}
              onChange={(e) => handleInput(e)}
            />
            {errors.dishTypes && <p className="p-danger">{errors.dishTypes}</p>}

            <select onChange={addDiets}>
              <option>Add diet type</option>
              {selectDiets()}
            </select>
            <ul className="create-ul">
              {input.diets.map((d) => {
                return <li key={d}>{d}</li>;
              })}
            </ul>

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
        </div>

        <div className="create-div-low">
          <label>Summary: </label>
          <textarea
            className={errors.summary && "input-danger"}
            name="summary"
            value={input.summary}
            onChange={handleInput}
            cols="80"
            rows="7"
          />
          {errors.summary && <p className="p-danger">{errors.summary}</p>}

          <label>Instructions: </label>
          <textarea
            className={errors.instructions && "input-danger"}
            name="instructions"
            value={input.instructions}
            onChange={(e) => handleInput(e)}
            cols="80"
            rows="7"
          />
          {errors.instructions && (
            <p className="p-danger">{errors.instructions}</p>
          )}

          <input type="submit" value="Create" className="btn-create" />
        </div>
      </form>
    </div>
  );
}
