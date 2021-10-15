import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomDrink } from '../services/randomsRequests';

function ExploreDrinks() {
  const [randomDrinkId, setRandomDrinkId] = useState(0);

  const history = useHistory();

  useEffect(() => {
    fetchRandomDrink()
      .then((response) => setRandomDrinkId(response.drinks[0].idDrink));
  }, []);

  const handleClick = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'Por Ingredientes') {
      history.push('/explorar/bebidas/ingredientes');
    }
    if (text === 'Me Surpreenda!') {
      history.push(`/bebidas/${randomDrinkId}`);
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

export default ExploreDrinks;
