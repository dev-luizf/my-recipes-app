import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomFood } from '../services/randomsRequests';

function ExploreFoods() {
  const [randomFoodId, setRandomFoodId] = useState(0);
  const history = useHistory();

  useEffect(() => {
    fetchRandomFood()
      .then((response) => setRandomFoodId(response.meals[0].idMeal));
  }, []);

  const handleClick = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'Por Ingredientes') {
      history.push('/explorar/comidas/ingredientes');
    }
    if (text === 'Por Local de Origem') {
      history.push('/explorar/comidas/area');
    }
    if (text === 'Me Surpreenda!') {
      history.push(`/comidas/${randomFoodId}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="explore-container">
        <button
          type="button"
          onClick={ handleClick }
          data-testid="explore-by-ingredient"
          className="explore-button"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="explore-by-area"
          className="explore-button"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="explore-surprise"
          className="explore-button"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
