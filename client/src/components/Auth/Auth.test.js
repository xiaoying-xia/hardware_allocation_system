import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import Auth from './Auth';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; // Add this import statement

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Auth component', () => {
  test('renders sign in form by default', () => {
    renderWithRedux(<Auth />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeDefined();
    expect(screen.getByText('Email Address')).toBeDefined();

  });

  test('switches between sign in and sign up forms', () => {
    renderWithRedux(<Auth />, { wrapper: MemoryRouter });

    userEvent.click(screen.getByRole('button', { name: /don't have an account\? sign up/i }));
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeDefined();

    userEvent.click(screen.getByRole('button', { name: /already have an account\? sign in/i }));
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeDefined();
  });

  // Add more tests for form submission and interaction as needed.
});
