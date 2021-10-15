import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import '../styles/profile.css';

function Profile() {
  const history = useHistory();
  let userEmail = JSON.parse(localStorage.getItem('user'));
  if (userEmail === null) {
    userEmail = '';
  } else {
    userEmail = userEmail.email;
  }

  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const handleClick = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'Receitas Feitas') {
      history.push('/receitas-feitas');
    }
    if (text === 'Receitas Favoritas') {
      history.push('/receitas-favoritas');
    }
  };

  const handleLeave = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="btns-profile">
        <h3 data-testid="profile-email">{ userEmail }</h3>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ handleClick }
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ handleClick }
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLeave }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
