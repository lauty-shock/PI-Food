import axios from "axios";

/////////////////////////////////////////////////////////////////////
///////Exporto las los tipos de acciones para errores de typeo///////
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_ORDER = "FILTER_ORDER";
export const FILTER_ORDER_SCORE = "FILTER_ORDER_SCORE";
export const DETAIL_RECIPE = "DETAIL_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
/////////////////////////////////////////////////////////////////////

var recipesx = []; //Creo un array vacío que será llenado con todas las recetas (API/DB)

export function getAllRecipes() {
  return async function (dispatch) {
    recipesx = await axios.get("/recipes"); //Hago un llamado a la ruta que creé y lo guardo en el array que creé

    // recipesx.data = await recipesx.data.map((r) => {
    //   if (r.id.toString().includes("-")) {
    //     console.log(
    //       "__________________________________________________________________________________________________________________________"
    //     );
    //     r.diets = r.diets.map((d) => {
    //       console.log(d.tipo);
    //       return "d.tipo";
    //     });
    //     console.log(
    //       "__________________________________________________________________________________________________________________________"
    //     );
    //   }
    //   console.log(r);
    //   return r;
    // });

    return dispatch({
      type: GET_ALL_RECIPES, // Le digo el tipo de acción con el que será llamada
      payload: recipesx.data, // El payload es el contenido que devuelve la acción
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    const diets = await axios.get("/diets"); //Hago un llamado a la ruta que creé y lo guardo en la constante "diets"

    return dispatch({
      type: GET_DIETS, // Le digo el tipo de acción con el que será llamada
      payload: diets.data, // El payload es el contenido que devuelve la acción
    });
  };
}

export function searchRecipes(name) {
  return async function (dispatch) {
    const recipes = await axios.get(
      `/recipes?name=${name}` //Hago un llamado a la ruta que cree para traer las recetas que contengan el "name"
    );

    if (typeof recipes.data === "string") {
      return dispatch({
        type: SEARCH_RECIPES, // Le digo el tipo de acción con el que será llamada
        payload: "recipes.data", // El payload es el contenido que devuelve la acción
      });
    }

    return dispatch({
      type: SEARCH_RECIPES, // Le digo el tipo de acción con el que será llamada
      payload: recipes.data, // El payload es el contenido que devuelve la acción
    });
  };
}

export function filterDiets(diet) {
  const recipes = recipesx.data; // Creo una constante con todas las recetas del array "recipesx" (linea 15)

  if (diet === "all") {
    // Si el "select" de la pagina esta en "Select diet" va a entrar en esta condicion
    return {
      type: FILTER_DIETS, // Le digo el tipo de acción con el que será llamada
      payload: recipes, // El payload es el contenido que devuelve la acción
    };
  } else {
    const filter_recipes = recipes.filter((r) => r.diets.includes(diet)); // Filtrado para dejar solo las recetas que correspondan a ese tipo de dieta

    if (filter_recipes.length <= 0) {
      return {
        type: FILTER_DIETS, // Le digo el tipo de acción con el que será llamada
        payload: [
          { title: "No diet", summary: `We do not have ${diet} recipes.` },
        ], // El payload es el contenido que devuelve la acción
      };
    }

    return {
      type: FILTER_DIETS, // Le digo el tipo de acción con el que será llamada
      payload: filter_recipes, // El payload es el contenido que devuelve la acción
    };
  }
}

export function filterOrder(order) {
  // Solo devuelvo el string que dice el tipo de orden
  return {
    type: FILTER_ORDER, // Le digo el tipo de acción con el que será llamada
    payload: order, // El payload es el contenido que devuelve la acción
  };
}

export function filterOrderScore(order) {
  // Solo devuelvo el string que dice el tipo de orden
  return {
    type: FILTER_ORDER_SCORE, // Le digo el tipo de acción con el que será llamada
    payload: order, // El payload es el contenido que devuelve la acción
  };
}

export function detailRecipe(id) {
  return async function (dispatch) {
    const recipe = await axios.get(`/recipes/${id}`); // Pedido para traer los detalles de una receta

    if (id.toString().includes("-")) {
      // Si el "id" de la receta incluye "-" (UUID)

      // Originalmente el las dietas de la receta va a venir como un array de obj
      //aquí hago un mapeo para cambiarlo a un array que solo contenga los tipos de dietas
      recipe.data.diets = recipe.data.diets.map((d) => {
        return `${d.tipo}, `;
      });
    }

    return dispatch({
      type: DETAIL_RECIPE, // Le digo el tipo de acción con el que será llamada
      payload: recipe.data, // El payload es el contenido que devuelve la acción
    });
  };
}

export function createRecipe(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/recipes`, input); //Pedido a la ruta de creacion le paso el obj input para que lo cree

      return dispatch({
        type: CREATE_RECIPE, // Le digo el tipo de acción con el que será llamada
        payload: response.data, // El payload es el contenido que devuelve la acción
      });
    } catch (error) {
      console.log(error);
    }
  };
}
