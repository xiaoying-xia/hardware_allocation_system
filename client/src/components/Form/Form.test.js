import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Form from './Form';
import rootReducer from '../../reducers';

const store = createStore(rootReducer);

const customRender = (ui, ...renderOptions) => {
    return render(<Provider store={store}>{ui}</Provider>, ...renderOptions);
  };
  

describe('Form component', () => {
  beforeEach(() => {
    localStorage.setItem(
      'profile',
      JSON.stringify({ result: { name: 'Test User' } })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders form with input fields and buttons', () => {
    customRender(<Form />);
    expect(screen.getByText('Create new project')).toBeDefined();
    expect(screen.getByTestId('Project Name')).toBeDefined();
    expect(screen.getByTestId('Creator')).toBeDefined();
    expect(screen.getByTestId('Description')).toBeDefined();
    expect(screen.getByTestId('Tags')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeDefined();
  });
});
