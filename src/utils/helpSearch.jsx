const helpSearch = (searchResults, path) => {
  if (path.includes('comidas')) {
    return `/comidas/${searchResults[0].idMeal}`;
  }
  return `/bebidas/${searchResults[0].idDrink}`;
};

export const getPathAndApi = (option, path) => {
  if (path.includes('comidas')) {
    if (option === 'api') {
      return 'themealdb';
    }
    return '/comidas';
  }
  if (option === 'api') {
    return 'thecocktaildb';
  }
  return '/bebidas';
};

export default helpSearch;
