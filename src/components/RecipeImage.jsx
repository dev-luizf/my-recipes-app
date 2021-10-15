import React from 'react';
import PropTypes from 'prop-types';

const RecipeImage = ({ thumb }) => (
  <div className="img-details">
    <img data-testid="recipe-photo" src={ thumb } alt="img" />
  </div>
);

RecipeImage.propTypes = {
  thumb: PropTypes.string.isRequired,
};

export default RecipeImage;
