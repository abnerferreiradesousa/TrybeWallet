import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

const VALID_EMAIL = 'maybe@email.com';
const VALID_PASSWORD = '123456';
const INVALID_EMAIL_0 = 'email';
const INVALID_PASSWORD = '54321';

describe('A página de login', () => {
  it('1 - Deve está na rota \'/.\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  it('2 - Deve haver dois inputs do tipo email e senha e um botão.', () => {
    renderWithRouterAndRedux(<App />, ['/']);

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/senha/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

  });

  it('3 - Botão "Entrar" só é habilitado quando inserido email e senha válidos.', () => {
    renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeDisabled();

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/senha/i);

    userEvent.type(email, INVALID_EMAIL_0);
    userEvent.type(password, INVALID_PASSWORD);
    expect(btn).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(btn).toBeEnabled();
  });

  it('4 - Salva o email digitado e exibe pegando do estado da aplicação.', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    fireEvent.click(button);

    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });

  test('5 - A rota deve ser mudada para \'/carteira\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });

})