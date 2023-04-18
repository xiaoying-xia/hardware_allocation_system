import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './projects';
import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('projects actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should create an action to fetch all projects', () => {
    const expectedAction = [{ type: FETCH_ALL, payload: {} }];
    api.fetchProjects = jest.fn(() => ({ data: {} }));

    return store.dispatch(actions.getProjects()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should create an action to create a new project', () => {
    const project = { title: 'test project', description: 'test description' };
    const expectedAction = [{ type: CREATE, payload: project }];
    api.createProject = jest.fn(() => ({ data: project }));

    return store.dispatch(actions.createProject(project)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should create an action to update a project', () => {
    const id = '123';
    const project = { title: 'updated project', description: 'updated description' };
    const expectedAction = [{ type: UPDATE, payload: project }];
    api.updateProject = jest.fn(() => ({ data: project }));

    return store.dispatch(actions.updateProject(id, project)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
