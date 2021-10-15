import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsList from '../components/IngredientsList';
import RecipeHead from '../components/RecipeHead';
import RecipeImage from '../components/RecipeImage';
import RecipeInstructions from '../components/RecipeInstructions';
import ShareButton from '../components/ShareButton';
import StartRecipesBtn from '../components/StartRecipesBtn';
import { fetchDetails, fetchRecipes } from '../services/requests';
import '../styles/itemCard.css';
import changeVideoLink from '../utils/changeVideoLink';
import handleIngredientsList from '../utils/handleIngredientsList';

function RecipesDetails() {
  const [details, setDetails] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loadMessage, setLoadMessage] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const path = history.location.pathname;
  let api;
  let api2;
  let thumb;
  let recipeThumb;
  let title;
  let strRecipe;
  let category;
  let idIten;
  let type;

  if (path.includes('comidas')) {
    api = 'themealdb';
    api2 = 'thecocktaildb';
    thumb = 'strMealThumb';
    recipeThumb = 'strDrinkThumb';
    strRecipe = 'strDrink';
    title = 'strMeal';
    category = 'strCategory';
    idIten = 'idDrink';
    type = 'bebidas';
  } else {
    api = 'thecocktaildb';
    api2 = 'themealdb';
    thumb = 'strDrinkThumb';
    recipeThumb = 'strMealThumb';
    strRecipe = 'strMeal';
    title = 'strDrink';
    category = 'strAlcoholic';
    idIten = 'idMeal';
    type = 'comidas';
  }

  const handleFecthDetail = async () => {
    const apiReturn = await fetchDetails(api, id);
    setDetails(apiReturn);
  };

  const handleFecthRecipes = async () => {
    const numberOfRecipes = 6;
    const apiReturn = await fetchRecipes(numberOfRecipes, api2);
    setRecipes(apiReturn);
  };

  useEffect(() => {
    setDetails([]);
    handleFecthDetail();
    handleFecthRecipes();
  }, [id]);

  if ((details.length === 0 || !details) || (recipes.length === 0 || !recipes)) {
    return 'loading';
  }
  if (!details[0][thumb] || !recipes[0][strRecipe]) {
    return 'loading';
  }
  const listOfIngredients = handleIngredientsList(details[0]);

  let player = details[0].strYoutube;
  player = changeVideoLink(path, player);

  return (
    <div>
      <RecipeImage thumb={ details[0][thumb] } />
      <div className="head-details">
        <RecipeHead title={ details[0][title] } category={ details[0][category] } />
        <div className="head-btns">
          <ShareButton testid="share-btn" setLoadMessage={ setLoadMessage } />
          <FavoriteButton
            testid="favorite-btn"
            isFavoritePage={ false }
            details={ details[0] }
          />
          <p hidden={ !loadMessage }>Link copiado!</p>
        </div>
      </div>
      <IngredientsList
        progress={ false }
        testid="ingredient-name-and-measure"
        list={ listOfIngredients }
      />
      <RecipeInstructions instructions={ details[0].strInstructions } />
      {path.includes('comidas')
        && (
          <div className="player-video" id="teste">
            <iframe
              data-testid="video"
              whidth="360"
              height="300"
              src={ player }
              frameBorder="0"
              title="Youtube Video Player"
            />
          </div>
        )}
      <div className="recomended">
        <h3>Recommended Recipes</h3>
        <div className="item-card-cont-details">
          {recipes.map((recipe, index) => (
            <div
              className="item-card-recomend"
              data-testid={ `${index}-recomendation-card` }
              key={ `${recipe[strRecipe]}` }
            >
              <p data-testid={ `${index}-recomendation-title` }>{recipe[strRecipe]}</p>
              <Link to={ `/${type}/${recipe[idIten]}` }>
                <input
                  type="image"
                  src={ recipe[recipeThumb] }
                  alt={ recipe[strRecipe] }
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-start-div">
        <StartRecipesBtn />
      </div>
    </div>
  );
}
export default RecipesDetails;
