import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableExpense extends React.Component {
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
          {totalExpenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.wallet.expenses);
  return {
    totalExpenses: state.wallet.expenses,
  };
};

TableExpense.propTypes = {
  totalExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableExpense);
