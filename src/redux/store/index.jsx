import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
  const { user } = store.getState();
  const { mealsToken, cocktailsToken, email } = user;
  localStorage.setItem('mealsToken', mealsToken);
  localStorage.setItem('cocktailsToken', cocktailsToken);
  if (email !== '') {
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
  }
});

export default store;
