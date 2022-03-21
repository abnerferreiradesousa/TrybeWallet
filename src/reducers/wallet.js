// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { REQUEST_SUCCESS, DELETE_EXPENSE, ADD_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, ...action.payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
