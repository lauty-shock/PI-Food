import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_ORDER = "FILTER_ORDER";
export const FILTER_ORDER_SCORE = "FILTER_ORDER_SCORE";
export const DETAIL_RECIPE = "DETAIL_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";

var recipesx = [];

export function getAllRecipes() {
  return async function (dispatch) {
    recipesx = await axios.get("http://localhost:3001/recipes");

    return dispatch({
      type: GET_ALL_RECIPES,
      payload: recipesx.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    const diets = await axios.get("http://localhost:3001/diets");

    return dispatch({
      type: GET_DIETS,
      payload: diets.data,
    });
  };
}

export function searchRecipes(name) {
  return async function (dispatch) {
    const recipes = await axios.get(
      `http://localhost:3001/recipes?name=${name}`
    );

    return dispatch({
      type: SEARCH_RECIPES,
      payload: recipes.data,
    });
  };
}

export function filterDiets(diet) {
  return async function (dispatch) {
    // const recipes = await axios.get(`http://localhost:3001/recipes`);
    const recipes = recipesx;

    if (diet === "all") {
      return dispatch({
        type: FILTER_DIETS,
        payload: recipes.data,
      });
    } else {
      const filter_recipes = recipes.data.filter((r) => r.diets.includes(diet));

      return dispatch({
        type: FILTER_DIETS,
        payload: filter_recipes,
      });
    }
  };
}

export function filterOrder(order) {
  return {
    type: FILTER_ORDER,
    payload: order,
  };
}

export function filterOrderScore(order) {
  return {
    type: FILTER_ORDER_SCORE,
    payload: order,
  };
}

export function detailRecipe(id) {
  return async function (dispatch) {
    const recipe = await axios.get(`http://localhost:3001/recipes/${id}`);

    if (id.toString().includes("-")) {
      recipe.data.diets = recipe.data.diets.map((d) => {
        return `${d.tipo}, `;
      });
    }

    return dispatch({
      type: DETAIL_RECIPE,
      payload: recipe.data,
    });
  };
}

export function createRecipe(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/recipes`, input);

      return dispatch({
        type: CREATE_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
