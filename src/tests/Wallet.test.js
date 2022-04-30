import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { stateWithExpenses, stateWithEmail, responseCoins } from './helpers/mockData';
import Wallet from '../pages/Wallet';

import {getRoles, logRoles} from '@testing-library/dom'

const INPUT_EMAIL_TEST_ID = 'email-input';
const TOTAL_FIELD_TEST_ID = 'total-field';
const CURRENCY_EXCHANGE_FIELD = 'header-currency-field';

describe('A página wallet', () => {
  it('1 - Deve está na rota \'/carteira\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');
    const email = screen.queryByTestId(INPUT_EMAIL_TEST_ID);

    expect(history.location.pathname).toBe('/carteira');
    expect(email).toBeNull();

  });
  describe('Deve conter um header que', () => {
    it('2 - Renderiza um elemento com email usado no login', () => {
      const { store } = renderWithRouterAndRedux(
        <App />, {
          initialEntries: ['/carteira'],
          initialState: stateWithEmail,
        });
      const emailField = screen.getByTestId('email-field');
      expect(emailField.innerHTML).not.toBe('');
      expect(emailField).toContainHTML(store.getState().user.email);
    })
    it('3 - Renderiza um elmento com o total de gastos', () => {
      const { store } = renderWithRouterAndRedux(
        <App />, {
          initialEntries: ['/carteira'],
          initialState: stateWithEmail,
        });
      const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);

      const INITIAL_VALUE = 0;
      expect(totalField).toContainHTML(INITIAL_VALUE);
    });
    test('4 - Exibe o cambio utilizado \'BRL\'', () => {
      renderWithRouterAndRedux(<Wallet />, ['/carteira']);
      const exchangeField = screen.getByTestId(CURRENCY_EXCHANGE_FIELD);
  
      expect(exchangeField).toBeInTheDocument();
      expect(exchangeField).toContainHTML('BRL');
    });
  });
});
