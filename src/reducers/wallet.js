// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case GET_EXPANSES_DATA:
  //   return {
  //     ...state,
  //     expenses: [...state.expenses, ...action.payload],
  //   };
  case SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  // case FAILED:
  //   return {
  //     ...state,
  //     expenses: [...state.expenses, ...action.payload],
  //   };
  default:
    return state;
  }
};

export default walletReducer;
