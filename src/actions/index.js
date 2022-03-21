// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

const actionEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

const getCurrency = (json) => ({
  type: REQUEST_SUCCESS, payload: json,
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
