import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import {
  Drinks, Explore, FavoriteRecipes,
  Foods, Login, Profile, RecipesDone, ExploreFoods,
  ExploreDrinks, ExploreIngredients, NotFound,
  RecipesDetails, ExploreFoodsArea, RecipesInProgress,
} from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/comidas/:id" component={ RecipesDetails } />
      <Route exact path="/bebidas/:id" component={ RecipesDetails } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/Comidas" component={ Foods } />
      <Route exact path="/Bebidas" component={ Drinks } />
      <Route exact path="/Explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreIngredients }
      />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsArea } />
      <Route exact path="/Perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ RecipesInProgress }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ RecipesInProgress }
      />
      <Route component={ NotFound } />
    </Switch>

  );
}

export default App;
