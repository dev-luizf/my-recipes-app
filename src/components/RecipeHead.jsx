import React from 'react';
import PropTypes from 'prop-types';

const RecipeHead = ({ title, category }) => (
  <div>
    <h1 data-testid="recipe-title">
      {title}
    </h1>
    <p data-testid="recipe-category">
      {category}
    </p>
  </div>
);

RecipeHead.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default RecipeHead;
