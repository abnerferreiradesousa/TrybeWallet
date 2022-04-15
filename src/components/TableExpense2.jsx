import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';
import './TableExpense.css';

class TableExpense extends React.Component {
  handleDelete = ({ target }) => {
    const { totalExpenses, getUpdateExpense } = this.props;
    const removeExpanse = totalExpenses
      .filter((expense) => expense.id !== Number(target.id));
    getUpdateExpense(removeExpanse);
  };

  handleEditExpense =({ target }) => {
    const { totalExpenses, handleEdit, editDataExpanse } = this.props;
    handleEdit();
    const editExpanse = totalExpenses
      .find((expense) => expense.id === Number(target.id));
    editDataExpanse(editExpanse);
  };

  render() {
    const { totalExpenses } = this.props;
    return (
      <table className="card">
        <thead>
          <tr>
            <th className="header__item">Descrição</th>
            <th className="header__item">Tag</th>
            <th className="header__item">Método de pagamento</th>
            <th className="header__item">Valor</th>
            <th className="header__item">Moeda</th>
            <th className="header__item">Câmbio utilizado</th>
            <th className="header__item">Valor convertido</th>
            <th className="header__item">Moeda de conversão</th>
            <th className="header__item">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="card__header">
          {/* <tr className="card__item">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr> */}
          {totalExpenses && totalExpenses.map((expense) => (
            <tr
              key={ expense.id }
              id={ expense.id }
              // className="card__item"
            >
              <td className="body_item teste">{expense.description}</td>
              <td className="body_item">{expense.tag}</td>
              <td className="body_item">{expense.method}</td>
              <td className="body_item">{Number(expense.value).toFixed(2)}</td>
              <td className="body_item">
                {expense.exchangeRates[expense.currency].name}
              </td>
              <td className="body_item">
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td className="body_item">
                {(Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
              </td>
              <td className="body_item">Real</td>
              <td className="body_item">
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
      </table>
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
  handleEdit: PropTypes.func.isRequired,
  editDataExpanse: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
