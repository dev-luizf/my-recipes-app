import React, { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import SmallRecipeCard from '../components/SmallRecipeCard';
import '../styles/doneRecipes.css';

function RecipesDone() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);
  const [filters, setFilters] = useState('all');

  useEffect(() => {
    if (filters === 'all') {
      setDoneRecipes(recipes);
    } else {
      setDoneRecipes(recipes.filter((done) => done.type === filters));
    }
  }, [filters]);

  if (!recipes || recipes.length === 0) {
    return (
      <div>
        <Header />
        <p>Opa, nenhuma receita finalizada!</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <Filters setFilters={ setFilters } />
        <SmallRecipeCard
          isFavoritePage={ false }
          recipes={ doneRecipes }
        />
      </div>
    </div>
  );
}

export default RecipesDone;
