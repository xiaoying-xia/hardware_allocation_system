import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../api';
import { signin, signup, join, leave } from './auth';
import { AUTH, JOIN, LEAVE } from '../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const baseURL = 'http://localhost:5000';

describe('auth actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('signin', async () => {
    const data = { user: 'testUser' };
    const formData = { email: 'test@example.com', password: 'password' };
    const router = { push: jest.fn() };

    nock(baseURL)
      .post('/user/signin', formData)
      .reply(200, data);

    const expectedActions = [{ type: AUTH, data }];
    const store = mockStore({});

    await store.dispatch(signin(formData, router));
    expect(store.getActions());
    expect(router.push);
  });

  test('signup', async () => {
    const data = { user: 'testUser' };
    const formData = { email: 'test@example.com', password: 'password' };
    const router = { push: jest.fn() };

    nock(baseURL)
      .post('/user/signup', formData)
      .reply(200, data);

    const expectedActions = [{ type: AUTH, data }];
    const store = mockStore({});

    await store.dispatch(signup(formData, router));
    expect(store.getActions());
    expect(router.push);
  });

  test('join', async () => {
    const data = { user: 'testUser' };
    const id = 'testId';

    nock(baseURL)
      .patch(`/user/join/${id}`)
      .reply(200, data);

    const expectedActions = [{ type: JOIN, data }];
    const store = mockStore({});

    await store.dispatch(join(id));
    expect(store.getActions());
  });

  test('leave', async () => {
    const data = { user: 'testUser' };
    const id = 'testId';

    nock(baseURL)
      .patch(`/user/leave/${id}`)
      .reply(200, data);

    const expectedActions = [{ type: LEAVE, data }];
    const store = mockStore({});

    await store.dispatch(leave(id));
    expect(store.getActions());
  });
});
