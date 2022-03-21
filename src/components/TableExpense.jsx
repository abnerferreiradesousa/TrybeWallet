import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class TableExpense extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleDelete = ({ target }) => {
    const { totalExpenses, getUpdateExpense } = this.props;
    const removeExpanse = totalExpenses
      .filter((expense) => expense.id !== Number(target.id));
    getUpdateExpense(removeExpanse);
  };

  handleEditExpense =({ target }) => {
    const { totalExpenses } = this.props;
    const editExpanse = totalExpenses
      .find((expense) => expense.id === Number(target.id));
    return editExpanse;
  };

  render() {
    const { totalExpenses } = this.props;

    return (
      <section>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {totalExpenses && totalExpenses.map((expense) => (
            <tr
              key={ expense.id }
              id={ expense.id }
            >
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ expense.id }
                  onClick={ this.handleDelete }
                >
                  Deletar
                </button>
                <button
                  data-testid="edit-btn"
                  type="button"
                  id={ expense.id }
                  onClick={ this.handleEditExpense }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  totalExpenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getUpdateExpense: (id) => dispatch(deleteExpense(id)),
});

TableExpense.propTypes = {
  totalExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUpdateExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
