import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setDrinkList, setFoodList } from '../redux/actions';
import { fetchSearch } from '../services/requests';
import '../styles/search.css';
import helpSearch, { getPathAndApi } from '../utils/helpSearch';

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialState = {
    search: '',
    searchCategory: '',
  };
  const firstRender = useRef(true);
  const path = history.location.pathname;
  const [state, setState] = useState(initialState);
  const [searchResults, setSearchResults] = useState([]);

  const pathRecipes = getPathAndApi('pathRecipes', path);
  const api = getPathAndApi('api', path);

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSearchResults = () => {
    if (firstRender.current) {
      firstRender.current = false;
    } else if (searchResults === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (searchResults.length === 1) {
      const newPath = helpSearch(searchResults, path);
      history.push(newPath);
    } else {
      if (path.includes('comidas')) {
        dispatch(setFoodList(searchResults));
      } else {
        dispatch(setDrinkList(searchResults));
      }
      history.push(pathRecipes);
    }
  };

  const handleFetchSearch = async (query, endpoint) => {
    const results = await fetchSearch(query, endpoint, api);
    setSearchResults(results);
  };

  const resetSerchFields = () => {
    const radioButtons = document.getElementsByName('searchCategory');
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });
    setState(initialState);
  };

  const handleClick = async () => {
    const query = state.search;
    const endpoint = state.searchCategory;

    if (query.length > 1 && endpoint === 'firstLetter') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (query !== '' && endpoint !== '') {
      await handleFetchSearch(query, endpoint);
    }
    resetSerchFields();
  };

  useEffect(handleSearchResults, [searchResults, history, path, dispatch, pathRecipes]);

  return (
    <div className="search-bar">
      <div>
        <input
          placeholder="Busque por uma receita"
          onChange={ handleChange }
          value={ state.search }
          name="search"
          data-testid="search-input"
          type="text"
          className="input-search"
        />
      </div>
      <div>
        <label htmlFor="ingredient-search">
          <input
            onChange={ handleChange }
            value="ingredient"
            name="searchCategory"
            id="ingredient-search"
            data-testid="ingredient-search-radio"
            type="radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search">
          <input
            onChange={ handleChange }
            value="name"
            name="searchCategory"
            id="name-search"
            data-testid="name-search-radio"
            type="radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search">
          <input
            onChange={ handleChange }
            value="firstLetter"
            name="searchCategory"
            id="first-letter-search"
            data-testid="first-letter-search-radio"
            type="radio"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
