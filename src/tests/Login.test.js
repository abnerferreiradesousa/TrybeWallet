import React from 'react';
import { screen } from '@testing-library/react';
// import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const INITIAL_STATE = {
  loginReducer: {
    email: 'abner84@gmail.com',
    password: 'aaaaaaa',
  },
};

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
      const thColumns = ['Descrição', 'Tag, ']
    });  
  });
});
