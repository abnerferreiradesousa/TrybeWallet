// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_EXPANSES_DATA = 'GET_EXPANSES_DATA';
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';

const actionEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

function actionExpanses() {
  return {
    type: GET_EXPANSES_DATA,
  };
}

function getCurrency(json) {
  return { type: SUCCESS, payload: json };
}

// function failedRequest(error) {
//   return { type: FAILED, payload: error };
// }

export function fetchCurrency(data) {
  return async (dispatch) => {
    dispatch(actionExpanses());
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
export default actionEmail;
