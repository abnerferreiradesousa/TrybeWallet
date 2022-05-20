import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableExpense from '../components/TableExpense';
import { fetchCurrency, deleteExpense } from '../Redux/actions';
import './Wallet.css';
import handleRequest from '../servicesFromAPI';
import { DOLAR_TURISMO, TAG_ALIMENTO, TAG_OPTIONS, METHOD_OPTIONS } from './data';

const Wallet = ({ email, totalExpenses, getDataExpenses, getUpdateExpense }) => {
  const [id, setId] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState(TAG_ALIMENTO);
  const [isEditing, setIsEditing] = useState(false);
  const [exchangeRates, setExchangeRates] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [tagOptions] = useState(TAG_OPTIONS);
  const [methodOptions] = useState(METHOD_OPTIONS);

  const getCoinsToPutOptionsInSelect = async () => {
    const response = await handleRequest();
    const filterData = Object.keys(response).filter((coin) => coin !== DOLAR_TURISMO);
    setCurrencies(filterData);
  };

  useEffect(() => {
    getCoinsToPutOptionsInSelect();
  }, []);

  const editDataExpanse = (expanse) => {
    setId(expanse.id);
    setValue(expanse.value);
    setDescription(expanse.description);
    setExchangeRates(expanse.exchangeRates);
    setCurrency(expanse.currency);
    setMethod(expanse.method);
    setTag(expanse.tag);
  };

  const handleEdit = () => setIsEditing(!isEditing);

  const cleanInputs = () => {
    setId(id + 1);
    setValue('');
    setDescription('');
    setCurrency('USD');
    setMethod('Dinheiro');
    setTag(TAG_ALIMENTO);
  };

  const handleEditedExpanse = () => {
    const editObj = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      id,
    };
    totalExpenses.splice(id, 1, editObj);
    getUpdateExpense(totalExpenses);
    cleanInputs();
    handleEdit();
  };

  const handleExpenses = () => {
    const valueSummed = totalExpenses.reduce((acc, expense) => (
      acc + Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask)
    ), 0);
    return valueSummed.toFixed(2);
  };

  const handleClick = () => {
    cleanInputs();
    getDataExpenses({ value, description, currency, method, tag, exchangeRates, id });
  };

  return (
    <section className="head">
      <header className="head__logo">
        <section className="head__text">
          TrybeWallet
        </section>
        <section className="head__info">
          <span data-testid="email-field">
            {`Email: ${email}`}
          </span>
          <span data-testid="total-field">
            {`Despesa Total: ${handleExpenses()}`}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
      <form className="card__form">
        <label htmlFor="value">
          <input
            type="number"
            id="value"
            value={ value }
            className="card__input"
            placeholder="Valor"
            data-testid="value-input"
            onChange={ ({ target }) => setValue(target.value) }
          />
        </label>
        <label htmlFor="currency" className="head__label--black">
          Moedas
          <select
            id="currency"
            className="select--background"
            value={ currency }
            data-testid="currency-input"
            onChange={ ({ target }) => setCurrency(target.value) }
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

        <label htmlFor="method" className="head__label--black">
          Método de Pagamento
          <select
            name="method"
            className="select--background"
            id="method"
            value={ method }
            data-testid="method-input"
            onChange={ ({ target }) => setMethod(target.value) }
          >
            {methodOptions.map((methodOption) => (
              <option key={ methodOption } value={ methodOption }>{methodOption}</option>
            ))}
          </select>
        </label>

        <label htmlFor="tag" className="head__label--black">
          Tag
          <select
            name="tag"
            id="tag"
            className="select--background"
            value={ tag }
            data-testid="tag-input"
            onChange={ ({ target }) => setTag(target.value) }
          >
            {tagOptions.map((tagOption) => (
              <option key={ tagOption } value={ tagOption }>{tagOption}</option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          <input
            type="text"
            id="description"
            className="card__input"
            placeholder="Descrição"
            autoComplete="off"
            value={ description }
            data-testid="description-input"
            onChange={ ({ target }) => setDescription(target.value) }
          />
        </label>
        {
          isEditing ? (
            <button
              type="button"
              className="head__btn"
              onClick={ handleEditedExpanse }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              className="head__btn"
              onClick={ handleClick }
            >
              Adicionar despesa
            </button>
          )
        }
      </form>
      <section className="card__table">
        <TableExpense
          handleEdit={ handleEdit }
          editDataExpanse={ editDataExpanse }
        />
      </section>
    </section>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getDataExpenses: (data) => dispatch(fetchCurrency(data)),
  getUpdateExpense: (id) => dispatch(deleteExpense(id)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getDataExpenses: PropTypes.func.isRequired,
  totalExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUpdateExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
