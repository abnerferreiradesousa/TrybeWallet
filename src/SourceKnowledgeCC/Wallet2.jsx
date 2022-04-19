// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import TableExpense from '../components/TableExpense';
// import { fetchCurrency, deleteExpense } from '../actions';
// import './Wallet.css';

// const DOLAR_TURISMO = 'USDT';
// const TAG_ALIMENTO = 'Alimentação';
// class Wallet extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isEditing: false,
//       id: 0,
//       value: '',
//       description: '',
//       currency: 'USD',
//       method: 'Dinheiro',
//       tag: TAG_ALIMENTO,
//       exchangeRates: '',
//       currencies: [],
//     };
//   }

//   componentDidMount() {
//     this.handleRequest();
//   }

//   handleRequest = async () => {
//     try {
//       const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const dataJson = await response.json();
//       const filterData = Object.keys(dataJson).filter((coin) => coin !== DOLAR_TURISMO);
//       this.setState({
//         currencies: filterData,
//       });
//       // const { getCurrencies } = this.props;
//       // getCurrencies(filterData);
//     } catch (err) {
//       return err;
//     }
//   };

//   editDataExpanse = (expanse) => {
//     this.setState({
//       id: expanse.id,
//       value: expanse.value,
//       description: expanse.description,
//       exchangeRates: expanse.exchangeRates,
//       currency: expanse.currency,
//       method: expanse.method,
//       tag: expanse.tag,
//     });
//   };

//   handleEdit = () => {
//     this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
//   }

//   cleanInputs = () => {
//     this.setState((prevState) => ({
//       id: prevState.id + 1,
//       value: '',
//       description: '',
//       currency: 'USD',
//       method: 'Dinheiro',
//       tag: TAG_ALIMENTO,
//     }));
//   };

//   handleEditedExpanse = () => {
//     const { totalExpenses, getUpdateExpense } = this.props;
//     const { value, description, currency, method, tag, exchangeRates, id } = this.state;
//     const editObj = {
//       value,
//       description,
//       currency,
//       method,
//       tag,
//       exchangeRates,
//       id,
//     };
//     totalExpenses.splice(id, 1, editObj);
//     getUpdateExpense(totalExpenses);
//     this.cleanInputs();
//     this.handleEdit();
//   };

//   handleInput = ({ target }) => {
//     const { value, id } = target;
//     this.setState({ [id]: value });
//   };

//   handleClick = () => {
//     this.cleanInputs();
//     const { getDataExpenses } = this.props;
//     const { value, description, currency, method, tag, exchangeRates, id } = this.state;
//     getDataExpenses({ value, description, currency, method, tag, exchangeRates, id });
//   };

//   handleExpenses = () => {
//     const { totalExpenses } = this.props;
//     return totalExpenses.reduce((acc, expense) => (
//       acc + Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask)
//     ), 0);
//   };

//   render() {
//     const { email, totalExpenses } = this.props;
//     const {
//       value,
//       description,
//       currency,
//       method,
//       tag,
//       currencies,
//       isEditing,
//     } = this.state;

//     return (
//       <section className="card">
//         <header>
//           <section>
//             Trybe
//             <font>Wallet</font>
//           </section>
//           <section>
//             <span data-testid="email-field">
//               Email:
//               {' '}
//               {email}
//             </span>
//             <span data-testid="total-field">
//               Despesa Total:
//               {' '}
//               {totalExpenses.length > 0
//                 ? (this.handleExpenses()).toFixed(2)
//                 : 0}
//             </span>
//             <span data-testid="header-currency-field">BRL</span>
//           </section>
//         </header>
//         <form className="card__form">
//           <label htmlFor="value">
//             Valor
//             <input
//               type="number"
//               id="value"
//               value={ value }
//               data-testid="value-input"
//               onChange={ this.handleInput }
//             />
//           </label>
//           <label htmlFor="currency">
//             Moedas
//             <select
//               id="currency"
//               value={ currency }
//               data-testid="currency-input"
//               onChange={ this.handleInput }
//             >
//               {Array.from(currencies).map((coin) => (
//                 <option
//                   key={ coin }
//                   data-testid={ coin }
//                 >
//                   {coin}
//                 </option>))}
//             </select>
//           </label>

//           <label htmlFor="method">
//             Método de Pagamento
//             <select
//               name="method"
//               id="method"
//               value={ method }
//               data-testid="method-input"
//               onChange={ this.handleInput }
//             >
//               <option value="Dinheiro">Dinheiro</option>
//               <option value="Cartão de crédito">Cartão de crédito</option>
//               <option value="Cartão de débito">Cartão de débito</option>
//             </select>
//           </label>

//           <label htmlFor="tag">
//             Tag
//             <select
//               name="tag"
//               id="tag"
//               value={ tag }
//               data-testid="tag-input"
//               onChange={ this.handleInput }
//             >
//               <option value="Alimentação">Alimentação</option>
//               <option value="Lazer">Lazer</option>
//               <option value="Trabalho">Trabalho</option>
//               <option value="Transporte">Transporte</option>
//               <option value="Saúde">Saúde</option>

//             </select>
//           </label>
//           <label htmlFor="description">
//             Descrição
//             <input
//               type="text"
//               id="description"
//               value={ description }
//               data-testid="description-input"
//               onChange={ this.handleInput }
//             />
//           </label>
//           {
//             isEditing ? (
//               <button
//                 type="button"
//                 onClick={ this.handleEditedExpanse }
//               >
//                 Editar despesa
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={ this.handleClick }
//               >
//                 Adicionar despesa
//               </button>
//             )
//           }
//         </form>
//         <section className="card__table">
//           <TableExpense
//             handleEdit={ this.handleEdit }
//             editDataExpanse={ this.editDataExpanse }
//           />
//         </section>
//       </section>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   email: state.user.email,
//   totalExpenses: state.wallet.expenses,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getDataExpenses: (data) => dispatch(fetchCurrency(data)),
//   getUpdateExpense: (id) => dispatch(deleteExpense(id)),
//   // getCurrencies: (coins) => dispatch((currenciesAct(coins))),
// });

// Wallet.propTypes = {
//   email: PropTypes.string.isRequired,
//   getDataExpenses: PropTypes.func.isRequired,
//   // getCurrencies: PropTypes.func.isRequired,
//   totalExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
//   getUpdateExpense: PropTypes.func.isRequired,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
