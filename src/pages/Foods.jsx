import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import {
  fetchCategories,
  fetchRecipes,
  fetchRecipesByCategory,
} from '../services/requests';
import '../styles/itemCard.css';
import { enableSearchBar, setFoodList, setReloadList } from '../redux/actions';

const Foods = () => {
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const foodList = useSelector(({ recipes }) => recipes.foodList);
  const reloadList = useSelector(({ recipes }) => recipes.reloadList);
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );
  const [categoriesList, setCategoriesList] = useState([{ strCategory: 'All' }]);
  const [filterCategory, setFilterCategory] = useState('');

  const handleFoodsList = async () => {
    const limit = 12;
    const newFoodsList = await fetchRecipes(limit, 'themealdb');
    dispatch(setFoodList(newFoodsList));
  };

  const handleCategoriesList = async () => {
    const newCategoriesList = await fetchCategories('themealdb', 'c');
    setCategoriesList(categoriesList.concat(newCategoriesList));
  };

  const handleFetchByCategory = async (category) => {
    const newFoodsList = await fetchRecipesByCategory('themealdb', category);
    dispatch(setFoodList(newFoodsList));
  };

  const handleFilter = ({ target }) => {
    const category = target.innerHTML;
    if (category === 'All') {
      handleFoodsList();
    } else if (filterCategory !== category) {
      handleFetchByCategory(category);
      setFilterCategory(category);
    } else {
      setFilterCategory('');
      handleFoodsList();
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleCategoriesList();
    }
  });

  useEffect(() => {
    if (reloadList) {
      handleFoodsList();
      dispatch(setReloadList(false));
    }
  });

  useEffect(() => () => {
    dispatch(setReloadList(true));
    dispatch(enableSearchBar(false));
    dispatch(setFoodList([]));
  }, [dispatch]);

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="category-list">
        {!enableSearch && (categoriesList.length > 1 ? (
          categoriesList.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              onClick={ handleFilter }
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory}
            </button>)))
          : <p>loading</p>)}
      </div>
      <div className="item-card-container">
        {foodList.map(({ idMeal, strMeal, strMealThumb }, index) => (<RecipeCard
          key={ idMeal }
          recipeId={ idMeal }
          id={ index }
          name={ strMeal }
          path={ `comidas/${idMeal}` }
          api="themealdb"
          thumb={ strMealThumb }
        />))}
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
