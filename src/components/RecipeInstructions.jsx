import React from 'react';
import PropTypes from 'prop-types';

const RecipeInstructions = ({ instructions }) => (
  <div>
    <h3>
      Instructions
    </h3>
    <p data-testid="instructions">
      {instructions}
    </p>
  </div>
);

RecipeInstructions.propTypes = {
  instructions: PropTypes.string.isRequired,
};

export default RecipeInstructions;
