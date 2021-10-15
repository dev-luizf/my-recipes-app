import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({ setFilters }) => {
  const handleClick = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'All') {
      setFilters('all');
    } else if (text === 'Foods') {
      setFilters('comida');
    } else if (text === 'Drinks') {
      setFilters('bebida');
    }
  };

  return (
    <div className="btns-filter">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleClick }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
      >
        Drinks
      </button>
    </div>
  );
};

Filters.propTypes = {
  setFilters: PropTypes.func.isRequired,
};

export default Filters;
