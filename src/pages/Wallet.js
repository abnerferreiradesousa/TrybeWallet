import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableExpense from '../components/TableExpense';
import { fetchCurrency, currenciesAct } from '../actions';

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
      currencies: [],
    };
  }

  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const dataJson = await response.json();
      const filterData = Object.keys(dataJson).filter((coin) => coin !== DOLAR_TURISMO);
      this.setState({
        currencies: filterData,
      });
      const { getCurrencies } = this.props;
      getCurrencies(filterData);
    } catch (err) {
      return err;
    }
  };

  handleInput = ({ target }) => {
    const { value, id } = target;
    this.setState({ [id]: value });
  };

  handleClick = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    }));
    const { getDataExpenses } = this.props;
    const { value, description, currency, method, tag, exchangeRates, id } = this.state;
    getDataExpenses({ value, description, currency, method, tag, exchangeRates, id });
  };

  handleExpenses = () => {
    const { totalExpenses } = this.props;
    return totalExpenses.reduce((acc, expense) => (
      acc + Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask)
    ), 0);
  };

  render() {
    const { email, totalExpenses } = this.props;
    const { value, description, currency, method, tag, currencies } = this.state;

    return (
      <section>

        <p data-testid="email-field">{email}</p>

        <p data-testid="total-field">
          {totalExpenses.length > 0
            ? (this.handleExpenses()).toFixed(2)
            : 0}
        </p>

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
              {Array.from(currencies).map((coin) => (
                <option
                  key={ coin }
                  data-testid={ coin }
                >
                  {coin}
                </option>))}
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
        <TableExpense />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getDataExpenses: (data) => dispatch(fetchCurrency(data)),
  getCurrencies: (coins) => dispatch((currenciesAct(coins))),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getDataExpenses: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  totalExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
