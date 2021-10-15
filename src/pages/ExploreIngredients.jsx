import React, { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { fetchIngredients } from '../services/requests';

function ExploreIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const firstRender = useRef(true);
  const { pathname } = window.location;

  let api;
  let apiString;
  if (pathname.includes('comidas')) {
    api = 'themealdb';
    apiString = '';
  } else {
    api = 'thecocktaildb';
    apiString = '1';
  }

  const handleIngredientsList = async () => {
    const limit = 12;
    const IngredientsList = await fetchIngredients(limit, api);
    setIngredientsList(IngredientsList);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleIngredientsList();
    }
  });

  return (
    <div>
      <Header />
      <div className="item-card-container">
        {ingredientsList.map((ingredient, index) => (<IngredientCard
          key={ ingredient[`strIngredient${apiString}`] }
          id={ index }
          name={ ingredient[`strIngredient${apiString}`] }
          thumb={ `https://www.${api}.com/images/ingredients/${ingredient[`strIngredient${apiString}`]}-Small.png` }
        />))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreIngredients;
