import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { enableSearchBar } from '../redux/actions';
import { fetchCategories, fetchRecipes, fetchCountry } from '../services/requests';

function ExploreFoodsArea() {
  const [countryList, setCountryList] = useState([]);
  const [foodsList, setFoodsList] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');
  const firstRender = useRef(true);

  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );
  const dispatch = useDispatch();

  const handleCategoriesList = async () => {
    const newCategoriesList = await fetchCategories('themealdb', 'a');
    setCountryList(countryList.concat(newCategoriesList));
  };

  const handleFoodsList = async () => {
    const limit = 12;
    const newFoodsList = await fetchRecipes(limit, 'themealdb');
    setFoodsList(newFoodsList);
  };

  const handleCountryFoods = async (teste) => {
    const countryListFood = await fetchCountry(teste);
    setFoodsList(countryListFood);
  };

  const handleFilter = ({ target }) => {
    const country = target.value;
    if (country === 'All') {
      setFilterCountry('');
      handleFoodsList();
    } else if (filterCountry !== country) {
      handleCountryFoods(country);
      setFilterCountry(country);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleFoodsList();
      handleCategoriesList();
    }
  });

  useEffect(() => () => {
    dispatch(enableSearchBar(false));
  }, [dispatch]);

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="select-option">
        <select
          name=""
          onChange={ handleFilter }
          data-testid="explore-by-area-dropdown"
        >
          <option value="All" data-testid="All-option">All</option>
          {countryList.map(({ strArea }) => (
            <option
              value={ strArea }
              key={ strArea }
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>
          ))}
          ;
        </select>
      </div>
      <div className="item-card-container">
        {foodsList.map(({ idMeal, strMeal, strMealThumb }, index) => (<RecipeCard
          key={ idMeal }
          id={ index }
          name={ strMeal }
          path={ `/comidas/${idMeal}` }
          thumb={ strMealThumb }
        />))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsArea;
