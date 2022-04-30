import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { stateWithExpenses, stateWithEmail, responseCoins } from './helpers/mockData';
import Wallet from '../pages/Wallet';

const INITIAL_STATE = {
  loginReducer: {
    email: 'abner84@gmail.com',
    password: 'aaaaaaa',
  },
};

afterEach(() => jest.clearAllMocks());

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(responseCoins),
  ok: true,
});

const mockedExchange = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);


describe('Testando telas', () => {
  describe('Se rendenriza', () => {
    describe('1 - Na rota \'/\'', () => {
      beforeEach(() => {
        renderWithRouterAndRedux(<App />);
      })
      it('button: entrar', () => {
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
      });
      it('input: email', () => {
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      });
      it('input: senha', () => {
        expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
      });
    });
    describe('2 - Na rota \'/carteira\'', () => {
      describe('se os elementos são renderizados corretamente', () => {
        beforeEach(() => {
          renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira']});
        })
        it('button: Adicionar despesa', () => {
          expect(screen.getByRole('button', { name: /Adicionar despesa/i })).toBeInTheDocument();
        });
        it('button: Adicionar despesa', () => {
          expect(screen.getByText(/TrybeWallet/i)).toBeInTheDocument();
        });
        it('input: valor', () => {
          expect(screen.getByPlaceholderText(/valor/i)).toBeInTheDocument();
        });
        it('input: descrição', () => {
          expect(screen.getByPlaceholderText(/descrição/i)).toBeInTheDocument();
        });
        it('input: Moedas', () => {
          expect(screen.getByLabelText(/Moedas/i)).toBeInTheDocument();
        });
        it('input: Método de Pagamento', () => {
          expect(screen.getByLabelText(/Método de Pagamento/i)).toBeInTheDocument();
        });
        it('input: tag', () => {
          expect(screen.getByLabelText(/tag/i)).toBeInTheDocument();
        });
      })
      describe('Ao adicionar informações ', () => {
        it('Renderiza um elemento com email usado no login', () => {
          const { store } = renderWithRouterAndRedux(
            <App />, {
              initialEntries: ['/carteira'],
              initialState: stateWithEmail,
            });
          const emailField = screen.getByTestId('email-field');
          expect(emailField.innerHTML).not.toBe('');
          expect(emailField).toContainHTML(store.getState().user.email);
        })
        it('A tabela deve conter os campos Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio, Valor convertido e Moeda de conversão', () => {
          renderWithRouterAndRedux(<App />, {initialEntries: ['/carteira'], initialState: stateWithExpenses});
      
          expect(screen.getByRole('columnheader', { name: 'Descrição' })).toBeInTheDocument();
          expect(screen.getByRole('columnheader', { name: 'Tag' })).toBeInTheDocument();
          expect(screen.getByRole('columnheader', { name: 'Método de pagamento' })).toBeInTheDocument();
          expect(screen.getByRole('columnheader', { name: 'Moeda' })).toBeInTheDocument();
          expect(screen.getByRole('columnheader', { name: 'Câmbio utilizado' })).toBeInTheDocument();
          expect(screen.getByRole('columnheader', { name: 'Valor convertido' })).toBeInTheDocument();
          expect(screen.getByRole('columnheader', { name: 'Moeda de conversão' })).toBeInTheDocument();
          expect(screen.getByRole('columnheader', { name: 'Editar/Excluir' })).toBeInTheDocument();
        });

        
        it('Testa se a api é chamada', () => {
          renderWithRouterAndRedux(<App />, {initialEntries: ['/carteira'], initialState: stateWithExpenses});
          const addButton = screen.getByText(/Adicionar despesa/i);
          fireEvent.click(addButton);
          expect(mockedExchange).toBeCalled();
          expect(mockedExchange).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
        });
      })
    });  
  });
});
