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
import { enableSearchBar, setDrinkList, setReloadList } from '../redux/actions';

function Drinks() {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );
  // const recipeList = useSelector(({ recipes }) => recipes.recipeList);
  const drinkList = useSelector(({ recipes }) => recipes.drinkList);
  const reloadList = useSelector(({ recipes }) => recipes.reloadList);
  const dispatch = useDispatch();

  const [categoriesList, setCategoriesList] = useState([{ strCategory: 'All' }]);
  const [filterCategory, setFilterCategory] = useState('');
  const firstRender = useRef(true);

  const handleDrinksList = async () => {
    const limit = 12;
    const newDrinksList = await fetchRecipes(limit, 'thecocktaildb');
    // dispatch(setRecipeList(newDrinksList));
    dispatch(setDrinkList(newDrinksList));
  };

  const handleCategoriesList = async () => {
    const newCategoriesList = await fetchCategories('thecocktaildb', 'c');
    setCategoriesList([...categoriesList, ...newCategoriesList]);
  };

  const handleFetchByCategory = async (category) => {
    const newDrinksList = await fetchRecipesByCategory('thecocktaildb', category);
    // dispatch(setRecipeList(newDrinksList));
    dispatch(setDrinkList(newDrinksList));
  };

  const handleFilter = ({ target }) => {
    const category = target.innerHTML;
    if (category === 'All') {
      handleDrinksList();
    } else if (filterCategory !== category) {
      handleFetchByCategory(category);
      setFilterCategory(category);
    } else {
      handleDrinksList();
      setFilterCategory('');
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
      handleDrinksList();
      dispatch(setReloadList(false));
    }
  });

  useEffect(() => () => {
    dispatch(setReloadList(true));
    dispatch(enableSearchBar(false));
    dispatch(setDrinkList([]));
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
        {drinkList.map(({ idDrink, strDrink, strDrinkThumb }, index) => (<RecipeCard
          key={ idDrink }
          recipeId={ idDrink }
          id={ index }
          name={ strDrink }
          path={ `bebidas/${idDrink}` }
          api="thecocktaildb"
          thumb={ strDrinkThumb }
        />))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
