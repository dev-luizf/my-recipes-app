import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';

function StartRecipesBtn() {
  const history = useHistory();
  const path = history.location.pathname;
  const [recipeButtonText, setRecipeButtonText] = useState('Iniciar Receita');
  // const [disableButton, setDisableButton] = useState(false);
  const firstRender = useRef(true);

  const { id } = useParams();
  let key;
  let otherKey;
  if (path.includes('comidas')) {
    key = 'meals';
    otherKey = 'cocktails';
  } else {
    key = 'cocktails';
    otherKey = 'meals';
  }

  const handleClick = () => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        [otherKey]: {
          ...progress[otherKey],
        },
        [key]: {
          ...progress[key],
          [id]: [],
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        [otherKey]: {},
        [key]: { [id]: [] },
      }));
    }
    history.push(`${id}/in-progress`);
  };

  // const doubleRecipe = () => {
  //   const double = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (double && double.some((item) => item.id === id)) {
  //     setDisableButton(true);
  //   }
  // };

  const handleButtonText = () => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progress && progress[key][id]) {
      setRecipeButtonText('Continuar Receita');
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      handleButtonText();
      // doubleRecipe();
    } else firstRender.current = false;
  });

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
      className="btn-start"
      // disabled={ disableButton }
    >
      {recipeButtonText}
    </button>
  );
}

export default StartRecipesBtn;
