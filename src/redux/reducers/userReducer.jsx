import { LOGIN } from '../actions';

const initialState = {
  mealsToken: 1,
  cocktailsToken: 1,
  email: '',
};

const user = (state = initialState, { type, email }) => {
  switch (type) {
  case LOGIN:
    return { ...state, email };
  default:
    return state;
  }
};

export default user;
