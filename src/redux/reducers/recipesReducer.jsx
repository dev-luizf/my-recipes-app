import {
  SET_DRINK_LIST, SET_FOOD_LIST, SET_RECIPE_LIST, SET_RELOAD_LIST,
} from '../actions';

const INITIAL_STATE = {
  recipeList: [],
  foodList: [],
  drinkList: [],
  reloadList: true,
};

const recipes = (state = INITIAL_STATE, { type, payload, value }) => {
  switch (type) {
  case SET_RECIPE_LIST:
    return {
      ...state,
      recipeList: payload,
    };
  case SET_DRINK_LIST:
    return {
      ...state,
      drinkList: payload,
    };
  case SET_FOOD_LIST:
    return {
      ...state,
      foodList: payload,
    };
  case SET_RELOAD_LIST:
    return {
      ...state,
      reloadList: value,
    };
  default:
    return state;
  }
};

export default recipes;
