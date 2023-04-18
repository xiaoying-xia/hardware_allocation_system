import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Auth from './Auth';

const mockStore = configureStore([]);

describe('Auth component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      auth: {},
    });
    component = (
      <Provider store={store}>
        <Auth />
      </Provider>
    );
  });

  it('should render the component', () => {
    render(component);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should switch to sign up mode when the button is clicked', () => {
    render(component);
    fireEvent.click(screen.getByText('Don\'t have an account? Sign Up'));
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('should submit the form when the button is clicked', () => {
    const mockHistoryPush = jest.fn();
    const signupForm = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password',
      confirmPassword: 'password',
    };
    store.dispatch = jest.fn();
    const history = {
      push: mockHistoryPush,
    };
    render(
      <Provider store={store}>
        <Auth history={history} />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: signupForm.firstName },
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: signupForm.lastName },
    });
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: signupForm.email },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: signupForm.password },
    });
    fireEvent.change(screen.getByLabelText('Repeat Password'), {
      target: { value: signupForm.confirmPassword },
    });
    fireEvent.click(screen.getByText('Sign Up'));
    expect(store.dispatch).toHaveBeenCalledWith(signup(signupForm, history));
  });
});
