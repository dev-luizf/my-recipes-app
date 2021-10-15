import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import favoriteButtonHelper from '../utils/favoriteButtonHelper';

function FavoriteButton({ details, isFavoritePage, handleReload, testid }) {
  const [image, setImage] = useState(whiteHeartIcon);
  const location = useLocation();
  const path = location.pathname;

  const favorite = favoriteButtonHelper(isFavoritePage, path, details);
  const { id } = favorite;

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = recipes.some((element) => element.id === id);
      if (isFavorite) {
        setImage(blackHeartIcon);
      }
    }
  }, [id]);

  const handleFavorite = () => {
    if (image === blackHeartIcon) {
      setImage(whiteHeartIcon);
      const favItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favFiltered = favItem.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favFiltered));
      localStorage.setItem('img', whiteHeartIcon);
    } if (image === whiteHeartIcon) {
      setImage(blackHeartIcon);
      localStorage.setItem('img', blackHeartIcon);
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
      } else {
        const exist = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const arr = [...exist, favorite];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      }
    }
    if (isFavoritePage) {
      handleReload();
    }
  };

  return (
    <input
      type="image"
      data-testid={ testid }
      onClick={ handleFavorite }
      src={ image }
      alt="favorite"
    />
  );
}

FavoriteButton.propTypes = {
  details: PropTypes.objectOf(PropTypes.string).isRequired,
  isFavoritePage: PropTypes.bool.isRequired,
  handleReload: PropTypes.func,
  testid: PropTypes.string.isRequired,
};

FavoriteButton.defaultProps = {
  handleReload: () => console.log('oi'),
};

export default FavoriteButton;
