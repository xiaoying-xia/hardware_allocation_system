import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Project from './Project';
const mockStore = configureMockStore([thunk]);

const mockProject = {
  _id: 'testID',
  projectName: 'Test Project',
  description: 'Test Description',
  tags: ['testTag'],
  hw1Count: 5,
  hw2Count: 5,
  selectedFile: '',
};

const store = mockStore({
  availability: [
    { availability: 10 },
    { availability: 10 },
  ],
});
describe('Project Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Project project={mockProject} />
      </Provider>
    );
  });

  test('displays project name and description', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Project project={mockProject} />
      </Provider>
    );

    expect(getByText('Test Project')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  // Add other test cases here, for example, testing the join and leave button, check-in, and check-out functionality.
});
