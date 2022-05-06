import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { stateWithExpenses, stateWithEmail, responseCoins } from './helpers/mockData';
import Wallet from '../pages/Wallet';
import userEvent from '@testing-library/user-event';


import {getRoles, logRoles, within} from '@testing-library/dom'

const INPUT_EMAIL_TEST_ID = 'email-input';
const TOTAL_FIELD_TEST_ID = 'total-field';
const CURRENCY_EXCHANGE_FIELD = 'header-currency-field';

const responseFromAPI = Promise.resolve({
  json: () => Promise.resolve(responseCoins),
  ok: true,
})

const mockedExchange = jest.spyOn(global, 'fetch').mockImplementation(() => responseFromAPI)

afterEach(() => jest.clearAllMocks());

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
      renderWithRouterAndRedux(
        <App />, {
          initialEntries: ['/carteira'],
          initialState: stateWithEmail,
        });
      const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);

      const INITIAL_VALUE = 0;
      expect(totalField).toContainHTML(INITIAL_VALUE);
    });
    it('4 - Exibe o cambio utilizado \'BRL\'', () => {
      renderWithRouterAndRedux(<Wallet />, {initialEntries: ['/carteira']});
      const exchangeField = screen.getByTestId(CURRENCY_EXCHANGE_FIELD);
  
      expect(exchangeField).toBeInTheDocument();
      expect(exchangeField).toContainHTML('BRL');
    });
  });
  describe('Deve ter campos para inserir', () => {
    beforeEach(() => {
      renderWithRouterAndRedux(<Wallet />, {initialEntries: ['/carteira']});
    })
    it('5 - um valor.', () => {
      const valueField = screen.getByPlaceholderText(/valor/i);
      expect(valueField).toBeDefined();
    });
    it('6 - uma descrição.', () => {
      const descriptionField = screen.getByPlaceholderText(/Descrição/i);
      expect(descriptionField).toBeDefined();
    });
    it('7 - uma tag que, por sua vez, deve conter suas opções de tipos de gastos.', () => {
      const tagField = screen.getByLabelText(/Tag/i);
      const foodOption = screen.getByText(/Alimentação/i);
      const takeCareOption = screen.getByText(/Lazer/i);
      const workOption = screen.getByText(/Trabalho/i);
      const transportOption = screen.getByText(/Transporte/i);
      const healthOption = screen.getByText(/Saúde/i);

      expect(tagField).toBeDefined();
      expect(foodOption).toBeDefined();
      expect(takeCareOption).toBeDefined();
      expect(workOption).toBeDefined();
      expect(transportOption).toBeDefined();
      expect(healthOption).toBeDefined();
    });
    it('8 - um método de pagamento que, por sua vez, deve conter suas opções de pagamento.', () => {
      const methodField = screen.getByLabelText(/Método de Pagamento/i);
      const cashOption = screen.getByText(/Dinheiro/i);
      const creditOption = screen.getByText(/Cartão de crédito/i);
      const debitOption = screen.getByText(/Cartão de débito/i);

      expect(methodField).toBeDefined();
      expect(cashOption).toBeDefined();
      expect(creditOption).toBeDefined();
      expect(debitOption).toBeDefined();
    });
    it('9 - uma moeda.', () => {
      const coinField = screen.getByLabelText(/Moedas/i);
      expect(coinField).toBeDefined();
    });
  })
  describe('Deve ter uma tabela que exiba os seguines colunas.', () => {
    test('10 - Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido e Moeda de conversão', () => {
      renderWithRouterAndRedux(<Wallet />, {initialEntries: ['/carteira']});

      expect(screen.getByRole('columnheader', { name: /Descrição/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Tag/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Método de pagamento/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Moeda' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Câmbio utilizado/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Valor convertido/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Moeda de conversão/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /Editar\/Excluir/i })).toBeInTheDocument();
    });
   });
   describe('Deve salvar as informações da despesa no estado global e atualizar a soma de despesas no header', () => {
    test('11 - ao clicar em \'Adicionar despesa\'', async () => {
      const { store } = renderWithRouterAndRedux(
        <App />, {
          initialEntries: ['/carteira'],
        });
      const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
      const valueField = screen.getByPlaceholderText(/valor/i);
      const coinField = await screen.findByLabelText(/Moedas/i);
      const methodField = screen.getByLabelText(/Método de Pagamento/i);
      const tagField = screen.getByLabelText(/Tag/i);
      const descriptionField = screen.getByPlaceholderText(/Descrição/i);
  
      expect(addButton).toBeInTheDocument();
      userEvent.type(valueField, '10');
      userEvent.selectOptions(coinField, 'JPY');
      userEvent.selectOptions(methodField, 'Cartão de crédito');
      userEvent.selectOptions(tagField, 'Lazer');
      userEvent.type(descriptionField, 'Dez ienes');
      fireEvent.click(addButton);
      expect(mockedExchange).toBeCalledTimes(2);
  
      const expectedStateExpense = [
        {
          id: 0,
          value: '10',
          currency: 'JPY',
          method: 'Cartão de crédito',
          tag: 'Lazer',
          description: 'Dez ienes',
          exchangeRates: responseCoins,
        },
      ];
  
      await waitFor(() => {
        expect(valueField.value === 0 || valueField.value === '0' || valueField.value === '').toBe(true);
      });
      expect(store.getState().wallet.expenses).toStrictEqual(expectedStateExpense);


      userEvent.type(valueField, '30');
      userEvent.selectOptions(coinField, 'EUR');
      userEvent.selectOptions(methodField, 'Dinheiro');
      userEvent.selectOptions(tagField, 'Trabalho');
      userEvent.type(descriptionField, 'Trinta euros');
      fireEvent.click(addButton);
      expect(mockedExchange).toBeCalledTimes(3);

      const expectedStateExpense2 = [
        {
          id: 0,
          value: '10',
          currency: 'JPY',
          method: 'Cartão de crédito',
          tag: 'Lazer',
          description: 'Dez ienes',
          exchangeRates: responseCoins,
        },
        {
          id: 1,
          value: '30',
          currency: 'EUR',
          method: 'Dinheiro',
          tag: 'Trabalho',
          description: 'Trinta euros',
          exchangeRates: responseCoins,
        },
      ];

      await waitFor(() => {
        expect(valueField.value === 0 || valueField.value === '0' || valueField.value === '').toBe(true);
      });
      expect(store.getState().wallet.expenses).toStrictEqual(expectedStateExpense2);

      const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
      expect(totalField).toContainHTML('158.31');
      });
    });
   describe('Deve renderizar dentro de options as siglas de moedas buscando de uma API', () => {
    test('12 - renderiza as siglas corretamente', async () => {
      renderWithRouterAndRedux(<Wallet />, '/carteira');
      const currencyInput = await screen.findByRole('combobox', {
        name: /moeda/i,
      });
  
      const coinOptions = within(currencyInput).getAllByRole('option');
      const coinsValues = coinOptions.map((coinOption) => coinOption.value);

      const expectedCoinOptions = [
        'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
        'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'
      ];
  
      expect(coinsValues).toEqual(expectedCoinOptions);
  
      expect(mockedExchange).toBeCalled();
      expect(mockedExchange).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
      expect(currencyInput).toBeInTheDocument();
    });
   });
});
