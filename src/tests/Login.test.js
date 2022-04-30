import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const VALID_EMAIL = 'maybe@email.com';
const VALID_PASSWORD = '123456';
const INVALID_EMAIL_0 = 'email';
const INVALID_PASSWORD = '54321';

describe('A página de login', () => {
  it('1 - Deve está na rota \'/\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  it('2 - Deve haver dois inputs do tipo email e senha e um botão', () => {
    renderWithRouterAndRedux(<App />, ['/']);

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/senha/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

  });

  // it('3 - Botão "Entrar" só é habilitado quando inserido email e senha válidos ', () => {
  //   renderWithRouterAndRedux(<App />);
  //   const btn = screen.getByRole('button', { name: /entrar/i });
  //   expect(btn).toBeDisabled();
  //   const email = screen.getByPlaceholderText(/email/i);
  //   const password = screen.getByPlaceholderText(/senha/i);
  //   user.type(email, INVALID_EMAIL_0);
  //   user.type(password, INVALID_PASSWORD);
  //   expect(btn).toBeDisabled();
  // });
})