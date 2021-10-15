import { combineReducers } from 'redux';
import user from './userReducer';
import functionsReducer from './functionsReducer';
import recipes from './recipesReducer';

const rootReducer = combineReducers({ user, functionsReducer, recipes });

export default rootReducer;
