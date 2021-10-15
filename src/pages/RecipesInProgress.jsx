import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsList from '../components/IngredientsList';
import RecipeHead from '../components/RecipeHead';
import RecipeImage from '../components/RecipeImage';
import RecipeInstructions from '../components/RecipeInstructions';
import ShareButton from '../components/ShareButton';
import { fetchDetails } from '../services/requests';
import handleIngredientsList from '../utils/handleIngredientsList';

function RecipesInProgress() {
  const [details, setDetails] = useState([]);
  const [loadMessage, setLoadMessage] = useState(false);
  const history = useHistory();
  const firstRender = useRef(true);
  const disableButton = useSelector(({ functionsReducer }) => (
    functionsReducer.disableFinishButton
  ));

  const path = history.location.pathname;
  const id = path.match(/\d+/)[0];
  let api;
  let thumb;
  let title;
  let category;
  let idItem;
  let area;
  let type;
  let cat;
  let tags;
  let lsKey;

  if (path.includes('comidas')) {
    api = 'themealdb';
    lsKey = 'meals';
    idItem = 'idMeal';
    thumb = 'strMealThumb';
    title = 'strMeal';
    category = 'strCategory';
    area = 'strArea';
    type = 'comida';
    cat = 'strCategory';
  } else {
    api = 'thecocktaildb';
    lsKey = 'cocktails';
    idItem = 'idDrink';
    thumb = 'strDrinkThumb';
    title = 'strDrink';
    category = 'strAlcoholic';
    cat = 'strCategory';
    area = '';
    type = 'bebida';
  }

  const handleFecthDetails = async () => {
    const apiReturn = await fetchDetails(api, id);
    setDetails(apiReturn);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleFecthDetails();
    }
  });

  if (details.length === 0) return 'loading';
  const listOfIngredients = handleIngredientsList(details[0]);

  // a data eu peguei aqui https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  today = `${dd}/${mm}/${yyyy}`;

  if (details[0].strTags === null) {
    tags = [];
  } else if (path.includes('comidas')) {
    tags = details[0].strTags.split(',');
  }

  const recipe = {
    id: details[0][idItem],
    type,
    area: details[0][area] || '',
    category: details[0][cat],
    alcoholicOrNot: details[0].strAlcoholic || '',
    name: details[0][title],
    image: details[0][thumb],
    doneDate: today,
    tags,
  };

  const handleClick = () => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
      history.push('/receitas-feitas');
    } else {
      const exist = JSON.parse(localStorage.getItem('doneRecipes'));
      const arr = [...exist, recipe];
      localStorage.setItem('doneRecipes', JSON.stringify(arr));
      history.push('/receitas-feitas');
    }
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress) {
      delete recipesInProgress[lsKey][id];
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
      const checkboxes = JSON.parse(localStorage.getItem('checkboxes'));
      delete checkboxes[id];
      localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
    }
  };

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
      <IngredientsList progress testid="ingredient-step" list={ listOfIngredients } />
      <RecipeInstructions instructions={ details[0].strInstructions } />
      <button
        className="btn-start"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        disabled={ disableButton }
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default RecipesInProgress;
