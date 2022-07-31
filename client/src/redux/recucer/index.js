/////////////Importo los tipos de acciones para errores de typeo/////////////
import {
  CREATE_RECIPE,
  DETAIL_RECIPE,
  FILTER_DIETS,
  FILTER_ORDER,
  FILTER_ORDER_SCORE,
  GET_ALL_RECIPES,
  GET_DIETS,
  SEARCH_RECIPES,
} from "../actions";
//////////////////////////////////////////////////////////////////////////////

/////////////Estados globales iniciales/////////////
const initialState = {
  recipes: {
    recipe: [],
    listener: true,
  },
  detail: {},
  diets: [],
};
////////////////////////////////////////////////////

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      //Cambio el array de dietas de las recetas de la db que viene//
      //como un array de obj por un array con los tipos de dietas ///
      action.payload.map((r) => {
        if (r.id.toString().includes("-")) {
          const newDiets = [];
          r.diets.map((d) => {
            newDiets.push(d.tipo);
          });
          r.diets = newDiets;
        }
      });
      return {
        ...state,
        recipes: { recipe: action.payload, listener: !state.recipes.listener },
        //cargo el estado global de recipes con las recetas y cambio su "listener" de true a false o viseversa
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload, //Cargo el stado global con los tipos de dietas
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: { recipe: action.payload, listener: !state.recipes.listener },
        //cargo el estado global de recipes con las recetas pedidas y cambio su "listener" de true a false o viseversa
      };
    case FILTER_DIETS:
      return {
        ...state,
        recipes: { recipe: action.payload, listener: !state.recipes.listener },
        //cargo el estado global de recipes con las recetas pedidas y cambio su "listener" de true a false o viseversa
      };
    case FILTER_ORDER:
      const order =
        action.payload === "upward"
          ? state.recipes.recipe.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              else return -1;
              //Ordeno el estado de recipes en orden asendente con el metodo .sort()
              //Si el nombre es mayor (Aa-Zz) retun 1 y si no return -1, los va acomodando
            })
          : state.recipes.recipe.sort((a, b) => {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
              else return -1;
              //Ordeno el estado de recipes en orden desendente con el metodo .sort()
              //Si el nombre es menor (Zz-Aa) retun 1 y si no return -1, los va acomodando
            });

      return {
        ...state,
        recipes: { recipe: order, listener: !state.recipes.listener },
        //Cambio el estado global de recipes al orden pedido y cambio su "listener" de true a false o viseversa
      };
    case FILTER_ORDER_SCORE:
      const orderScore =
        action.payload === "upward"
          ? state.recipes.recipe.sort((a, b) => {
              if (a.healthScore > b.healthScore) return 1;
              else return -1;
              //Ordeno el estado de recipes en orden asendente con el metodo .sort()
              //Si el healthScore es mayor retun 1 y si no return -1, los va acomodando
            })
          : state.recipes.recipe.sort((a, b) => {
              if (a.healthScore < b.healthScore) return 1;
              else return -1;
              //Ordeno el estado de recipes en orden desendente con el metodo .sort()
              //Si el healthScore es menor retun 1 y si no return -1, los va acomodando
            });

      return {
        ...state,
        recipes: { recipe: orderScore, listener: !state.recipes.listener },
        //Cambio el estado global de recipes al orden pedido y cambio su "listener" de true a false o viseversa
      };
    case DETAIL_RECIPE:
      return {
        ...state,
        detail: action.payload,
        // Cargo el estado global "detail" con los detalles de la receta pedida
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: {
          recipe: state.recipes.recipe,
          listener: !state.recipes.listener,
        },
        // Actualizo el estado de "recipes" para que vuelva a hacer el pedido y contenga la nueva receta creada
      };
    default:
      return state;
  }
}
