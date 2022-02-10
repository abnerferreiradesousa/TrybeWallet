import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

const DOLAR_TURISMO = 'USDT';
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      // expenses: [],
      exchangeRates: '',
      currencies: {},
    };
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => this.setState({
        currencies: Object.keys(json).filter((coin) => coin !== DOLAR_TURISMO) }))
      .catch((err) => err);
  }

  handleInput = ({ target }) => {
    const { value, id } = target;
    this.setState({ [id]: value });
  };

  handleClick = () => {
    // const { value, description, currency, method, tag, id } = this.state;

    // const objExpenses = {
    //   value,
    //   description,
    //   currency,
    //   method,
    //   tag,
    //   id,
    // };

    this.setState((prevState) => ({
      id: prevState.id + 1,
      // expenses: [...prevState.expenses, objExpenses],
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    }));
    // () => {
    // const { expenses } = this.state;
    // const { getDataExpenses } = this.props;
    // fetchCurrency(this.state);
    // });
    // const { value, description, currency, method, tag } = this.state;
    const { getDataExpenses } = this.props;
    const { value, description, currency, method, tag, exchangeRates, id } = this.state;
    getDataExpenses({ value, description, currency, method, tag, exchangeRates, id });
  };

  render() {
    const { email } = this.props;
    const { value, description, currency, method, tag, currencies } = this.state;

    return (
      <section>

        <p data-testid="email-field">{email}</p>

        <p data-testid="total-field">0</p>

        <p data-testid="header-currency-field">BRL</p>

        <form>

          <label htmlFor="value">
            Gastos
            <input
              type="number"
              id="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleInput }
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleInput }
            />
          </label>

          <label htmlFor="currency">
            Moedas
            <select
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleInput }
            >
              {Array.from(currencies).map((coin) => <option key={ coin }>{coin}</option>)}
            </select>
          </label>

          <label htmlFor="method">
            Método de Pagamento
            <select
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag
            <select
              name="tag"
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleInput }
            >
              <option value="Despesa">Tag da despesa</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>

            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getDataExpenses: (data) => dispatch(fetchCurrency(data)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getDataExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
