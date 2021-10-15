import React, { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import SmallRecipeCard from '../components/SmallRecipeCard';

function FavoriteRecipes() {
  const favoritesRecipes = JSON
    .parse(localStorage.getItem('favoriteRecipes'));

  const [favorites, setFavorites] = useState(favoritesRecipes);
  const [filters, setFilters] = useState('all');

  useEffect(() => {
    if (filters === 'all') {
      setFavorites(favoritesRecipes);
    } else {
      setFavorites(favoritesRecipes.filter((done) => done.type === filters));
    }
  }, [filters]);

  const reloadFavorites = () => {
    setFavorites(JSON
      .parse(localStorage.getItem('favoriteRecipes')));
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div>
        <Header />
        <p>Opa, nenhuma receita favoritada!</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Filters setFilters={ setFilters } />
      <SmallRecipeCard
        handleReload={ reloadFavorites }
        isFavoritePage
        recipes={ favorites }
      />
    </div>
  );
}

export default FavoriteRecipes;
