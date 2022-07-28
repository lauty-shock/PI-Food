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

const initialState = {
  recipes: {
    recipe: [],
    listener: true,
  },
  detail: {},
  diets: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
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
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: { recipe: action.payload, listener: !state.recipes.listener },
      };
    case FILTER_DIETS:
      return {
        ...state,
        recipes: { recipe: action.payload, listener: !state.recipes.listener },
      };
    case FILTER_ORDER:
      const order =
        action.payload === "upward"
          ? state.recipes.recipe.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              else return -1;
            })
          : state.recipes.recipe.sort((a, b) => {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
              else return -1;
            });

      return {
        ...state,
        recipes: { recipe: order, listener: !state.recipes.listener },
      };
    case FILTER_ORDER_SCORE:
      const orderScore =
        action.payload === "upward"
          ? state.recipes.recipe.sort((a, b) => {
              if (a.healthScore > b.healthScore) return 1;
              else return -1;
            })
          : state.recipes.recipe.sort((a, b) => {
              if (a.healthScore < b.healthScore) return 1;
              else return -1;
            });

      return {
        ...state,
        recipes: { recipe: orderScore, listener: !state.recipes.listener },
      };
    case DETAIL_RECIPE:
      return {
        ...state,
        detail: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: {
          recipe: state.recipes.recipe,
          listener: !state.recipes.listener,
        },
      };
    default:
      return state;
  }
}
