import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setUserEmail } from '../redux/actions/index';
import '../styles/login.css';
import loginIcon from '../images/loginIcon.svg';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [valid, setValid] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserEmail(state.email));

    history.push('/comidas');
  };

  useEffect(() => {
    document.title = 'Recipes App';
  }, []);

  useEffect(() => {
    const isValid = /\S+@\S+\.\S+/;
    const teste = isValid.test(state.email);
    const MIN_SIZE = 6;
    if (teste && state.password.length > MIN_SIZE) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [state]);

  return (
    <div className="form-login">
      <img src={ loginIcon } alt="login icon" />
      <form action="" className="form">
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={ state.email }
          onChange={ handleChange }
          placeholder="Email"
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ state.password }
          placeholder="Password"
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !valid }
          onClick={ handleSubmit }
          className="btn-login"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
