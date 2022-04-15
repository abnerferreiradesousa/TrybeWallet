import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';
import { thColumns } from '../pages/data';
import './TableExpense.css';

const TableExpense = ({
  totalExpenses,
  handleEdit,
  editDataExpanse,
  getUpdateExpense,
}) => {
  const handleDelete = ({ target }) => {
    const removeExpanse = totalExpenses
      .filter((expense) => expense.id !== Number(target.id));
    getUpdateExpense(removeExpanse);
  };

  const handleEditExpense = ({ target }) => {
    handleEdit();
    const editExpanse = totalExpenses
      .find((expense) => expense.id === Number(target.id));
    editDataExpanse(editExpanse);
  };

  return (
    <table className="card">
      <thead>
        <tr>
          {thColumns.map((thColumn) => (
            <th key={ thColumn } className="header__item">{thColumn}</th>
          ))}
        </tr>
      </thead>
      <tbody className="card__header">

        {totalExpenses && totalExpenses.map((expense) => (
          <tr
            key={ expense.id }
            id={ expense.id }
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
                onClick={ handleDelete }
              >
                Deletar
              </button>
              <button
                data-testid="edit-btn"
                type="button"
                id={ expense.id }
                onClick={ handleEditExpense }
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
