import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/ingredientsList.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setButtonState } from '../redux/actions/index';

const IngredientsList = ({ testid, list, progress }) => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { id } = useParams();

  const verifyIfShouldEnableButton = () => {
    let numberOfInputsChecked = 0;
    const inputs = document.querySelectorAll('input[type=\'checkbox\']');
    inputs.forEach((input) => {
      if (input.checked) {
        numberOfInputsChecked += 1;
      }
    });
    if (numberOfInputsChecked === inputs.length) {
      dispatch(setButtonState(false));
    } else {
      dispatch(setButtonState(true));
    }
  };

  const handleClick = ({ target: { name, checked } }) => {
    const checkboxes = JSON.parse(localStorage.getItem('checkboxes'));
    if (checkboxes) {
      if (checkboxes[id]) {
        if (checkboxes[id].includes(name)) {
          // se já existe no ls, remove o item
          checkboxes[id].splice(checkboxes[id].indexOf(name), 1);
          localStorage.setItem('checkboxes', JSON.stringify({
            ...checkboxes,
            [id]: [...checkboxes[id]],
          }));
        }
        if (checked) {
          // seta o item no ls se ele estiver checkado
          localStorage.setItem('checkboxes', JSON.stringify({
            ...checkboxes,
            [id]: [...checkboxes[id], name],
          }));
        }
      } else {
        // se não existe, cria
        localStorage.setItem('checkboxes', JSON.stringify({
          ...checkboxes,
          [id]: [name],
        }));
      }
    } else if (checked) {
      // seta o item no ls se ele estiver checkado e se não existe nada no ls
      localStorage.setItem('checkboxes', JSON.stringify({
        [id]: [name],
      }));
    }
    verifyIfShouldEnableButton();
    const label = document.querySelector(`label[name=${name}`);
    label.classList.toggle('checked');
  };

  const handleCheck = () => {
    const checkboxes = JSON.parse(localStorage.getItem('checkboxes'));
    if (checkboxes && checkboxes[id]) {
      checkboxes[id].forEach((check) => {
        const input = document.getElementById(check);
        const label = document.querySelector(`label[name=${check}`);
        label.classList.toggle('checked');
        input.setAttribute('checked', 'true');
      });
    }
  };

  useEffect(() => {
    if (progress && firstRender.current) {
      firstRender.current = false;
      handleCheck();
      verifyIfShouldEnableButton();
    }
  });

  return (
    <div>
      <h3>Ingredients</h3>
      {list.map((item, index) => {
        if (item) {
          if (progress) {
            const name = item.split(' ')[0];
            return (
              <label
                key={ index }
                className="ingredient-item"
                data-testid={ `${index}-${testid}` }
                htmlFor={ name }
                name={ name }
              >
                <input
                  value={ name }
                  onClick={ handleClick }
                  type="checkbox"
                  name={ name }
                  id={ name }
                />
                {item}
              </label>
            );
          }
          return (
            <div key={ index } data-testid={ `${index}-${testid}` }>
              {item}
            </div>);
        }
        return <div key={ index } hidden />;
      })}
    </div>
  );
};

IngredientsList.propTypes = {
  testid: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  progress: PropTypes.bool.isRequired,
};

export default IngredientsList;
