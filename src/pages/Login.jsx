import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import actionEmail from '../Redux/actions';
import { MINIMIUM_CARACTERS, ROUTE_WALLET } from './data';
import './Login.css';

const Login = ({ sendEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validEmail = (userEmail) => {
    // REFERÊNCIA
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(userEmail);
  };

  const validPassword = () => password.length >= MINIMIUM_CARACTERS;

  const handleDisabled = () => validPassword() && validEmail(email);

  const redirectTo = (route) => {
    history.push(route);
  };

  const handleClick = () => {
    sendEmail(email);
    redirectTo(ROUTE_WALLET);
  };

  return (
    <section className="form__content">
      <form onSubmit={ handleClick } className="form">
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="email"
            autoComplete="off"
            className="form__input"
            id="email"
            placeholder="Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            className="form__input"
            id="password"
            placeholder="Senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="submit"
          className="form__btn"
          disabled={ !handleDisabled() }
          onClick={ handleClick }
        >
          ENTRAR
        </button>
      </form>
    </section>);
};

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(actionEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
