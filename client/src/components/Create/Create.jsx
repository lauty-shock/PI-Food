import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../redux/actions";
import { AiOutlineArrowRight } from "react-icons/ai";
import Swal from "sweetalert2";
import NoImage from "../../img/no-image.png";
import css from "./Create.module.css";

export default function Create() {
  const [input, setInput] = useState({
    title: "",
    image: "",
    dishTypes: [],
    summary: "",
    healthScore: 0,
    instructions: "",
    diets: [],
  });
  const [errors, setErrors] = useState({});
  const [dish, setDish] = useState("");
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  function validateError(input) {
    let errors = {};
    if (!input.title) {
      errors.title = "Title is required";
    } else if (!/^[a-zA-Z\s]+$/.test(input) && input.title.length < 4) {
      errors.title = "Title is invalid";
    }

    if (!input.summary) {
      errors.summary = "Summary is required";
    } else if (!/^[a-zA-Z\s]+$/.test(input) && input.summary.length < 4) {
      errors.summary = "Summary is invalid";
    }

    if (!input.instructions) {
      errors.instructions = "Complete instructions";
    }

    if (input.healthScore < 1 || input.healthScore > 100) {
      errors.healthScore = "Value must be between 1-100";
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
  function changeDish(e) {
    setDish(e.target.value);
  }
  function addDish(e) {
    e.preventDefault();
    if (!input.dishTypes.includes(dish)) {
      setInput({
        ...input,
        dishTypes: [...input.dishTypes, dish],
      });
    }
    setDish("");
  }
  function addDiets(e) {
    if (e.target.value !== "Add diet type") {
      if (!input.diets.includes(e.target.value)) {
        setInput({
          ...input,
          diets: [...input.diets, e.target.value],
        });
      }
    }
  }
  function deleteDish(e) {
    let aux = [];
    input.dishTypes.forEach((i) => {
      if (i !== e.target.id) {
        aux.push(i);
      }
    });
    setInput({
      ...input,
      dishTypes: aux,
    });
  }
  function deleteDiet(e) {
    let aux = [];
    input.diets.forEach((i) => {
      if (i !== e.target.id) {
        aux.push(i);
      }
    });
    setInput({
      ...input,
      diets: aux,
    });
  }
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
    else {
      dispatch(createRecipe(input));
      Swal.fire({
        title: "Recipe created!",
        icon: "success",
      });
      window.history.back();
    }
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>CREATE RECIPE</h1>
      <button className={css.btnCreate} onClick={validation}>
        CREATE
      </button>
      <Link className={css.back} to="/home">
        BACK
      </Link>

      <div className={css.containerType}>
        <h2 className={css.titleType}>DISH TYPE</h2>
        <form className={css.containerInputType} onSubmit={addDish}>
          <input
            value={dish}
            onChange={(e) => changeDish(e)}
            className={css.inputType}
            type="text"
            placeholder="Enter dish type"
          />
          <button type="submit" className={css.enterInput}>
            <AiOutlineArrowRight />
          </button>
        </form>
        {input.dishTypes.map((d) => {
          return (
            <li className={css.type} key={d}>
              {d}
              <span
                onClick={(e) => deleteDish(e)}
                id={d}
                className={css.deleteType}
              >
                x
              </span>
            </li>
          );
        })}
      </div>

      <form className={css.form}>
        <div className={css.containerTitle}>
          <input
            className={
              errors.title ? `${css.inputTitleDanger}` : `${css.inputTitle}`
            }
            type="text"
            name="title"
            value={input.title}
            onChange={handleInput}
            placeholder="Enter title"
          />
          {errors.title && <span className={css.pDanger}>{errors.title}</span>}

          <input
            className={
              errors.healthScore
                ? `${css.inputTitleDanger}`
                : `${css.inputTitle}`
            }
            type="number"
            name="healthScore"
            min={1}
            max={100}
            value={input.healthScore}
            onChange={(e) => handleInput(e)}
          />
          {errors.healthScore && (
            <span className={css.pDanger}>{errors.healthScore}</span>
          )}

          <textarea
            className={
              errors.summary
                ? `${css.inputSummaryDanger}`
                : `${css.inputSummary}`
            }
            name="summary"
            value={input.summary}
            placeholder="Enter summary"
            onChange={handleInput}
          />
          {errors.summary && (
            <span className={css.pDanger}>{errors.summary}</span>
          )}
        </div>
        <div className={css.containerImage}>
          <div className={css.divImg}>
            <img
              className={css.img}
              src={input.image !== "" ? input.image : `${NoImage}`}
              alt={input.image !== "" ? input.image : `${NoImage}`}
            />
          </div>
          <input
            className={css.inputURL}
            type="url"
            name="image"
            value={input.image}
            onChange={(e) => handleInput(e)}
            placeholder="Enter the URL of the image"
          />
        </div>
        <div className={css.containerIntruction}>
          <textarea
            className={
              errors.instructions
                ? `${css.inputIntructionDanger}`
                : `${css.inputIntruction}`
            }
            name="instructions"
            value={input.instructions}
            onChange={(e) => handleInput(e)}
            placeholder="Enter Intruction"
          />
          {errors.instructions && (
            <span className={css.pDanger}>{errors.instructions}</span>
          )}
        </div>
      </form>

      <div className={css.containerType}>
        <h2 className={css.titleType}>DIETS TYPE</h2>
        <select className={css.selectType} onChange={addDiets}>
          <option defaultValue="">Add diet type</option>
          {selectDiets()}
        </select>
        {input.diets.map((d) => {
          return (
            <li className={css.type} key={d}>
              {d}
              <span
                onClick={(e) => deleteDiet(e)}
                id={d}
                className={css.deleteType}
              >
                x
              </span>
            </li>
          );
        })}
      </div>
    </div>
  );
}
