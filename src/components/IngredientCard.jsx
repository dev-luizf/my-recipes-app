import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDrinkList, setFoodList, setReloadList } from '../redux/actions';
import { fetchIngredientsFilter } from '../services/requests';

function IngredientCard({ id, name, thumb }) {
  const dispatch = useDispatch();
  const { pathname } = window.location;
  let api;
  let newPath;
  if (pathname.includes('comidas')) {
    api = 'themealdb';
    newPath = '/comidas';
  } else {
    api = 'thecocktaildb';
    newPath = '/bebidas';
  }

  const handleClick = async ({ target }) => {
    const numOfRecipes = 12;
    dispatch(setReloadList(false));
    const ingredient = target.alt;
    const newRecList = await fetchIngredientsFilter(numOfRecipes, api, ingredient);
    if (pathname.includes('comidas')) {
      dispatch(setFoodList(newRecList));
    } else {
      dispatch(setDrinkList(newRecList));
    }
  };

  return (
    <div data-testid={ `${id}-ingredient-card` } className="item-card">
      <Link to={ newPath } onClick={ handleClick }>
        <h2 data-testid={ `${id}-card-name` }>{ name }</h2>
        <img src={ thumb } alt={ name } data-testid={ `${id}-card-img` } />
      </Link>
    </div>
  );
}

IngredientCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default IngredientCard;
