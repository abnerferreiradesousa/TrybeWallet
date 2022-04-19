// Coloque aqui suas actions
import {
  ADD_EMAIL,
  REQUEST_SUCCESS,
  // REQUEST_FAILED,
  DELETE_EXPENSE,
  ADD_CURRENCIES,
} from './actionTypes';

const actionEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

const getCurrency = (obj) => ({
  type: REQUEST_SUCCESS, payload: obj,
});

// function failedRequest(error) {
//   return { type: FAILED, payload: error };
// }

export function fetchCurrency(data) {
  return async (dispatch) => {
    // try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    data.exchangeRates = json;
    return dispatch(getCurrency(data));
    // }
    // catch (error) {
    //   return dispatch(failedRequest(error));
    // }
  };
}

export const currenciesAct = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export default actionEmail;
