import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import actionEmail from '../actions';

const MINIMIUM_CARACTERS = 6;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  validEmail = (email) => {
    // REFERÊNCIA
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(email);
  }

  handleDisabled = () => {
    const { email, password } = this.state;
    const validEmail = this.validEmail(email);
    return password.length >= MINIMIUM_CARACTERS && validEmail;
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ redirect: true });
    const { email } = this.state;
    const { getEmail } = this.props;
    getEmail(email);
  };

  render() {
    const { redirect } = this.state;
    return (
      <section>
        {redirect && <Redirect to="/carteira" />}
        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="email-input"
              name="email"
              type="email"
              id="email"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              data-testid="password-input"
              name="password"
              type="password"
              id="password"
              onChange={ this.handleInput }
            />
          </label>
          <button
            type="submit"
            disabled={ !this.handleDisabled() }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </section>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(actionEmail(email)),
});

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
