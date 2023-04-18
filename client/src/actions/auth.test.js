const configureMockStore = require('redux-mock-store').default;
const thunk = require('redux-thunk').default;
const { signin, signup, join, leave } = require('../auth');
const { AUTH, JOIN, LEAVE } = require('../../constants/actionTypes');
const api = require('../../api/index');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../api/index', () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
  join: jest.fn(),
  leave: jest.fn(),
}));

describe('auth actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  describe('signin', () => {
    const router = { push: jest.fn() };
    const formData = { email: 'test@test.com', password: 'testpassword' };

    it('should dispatch AUTH action and push to home page on successful signin', async () => {
      const response = { data: { result: { name: 'Test User' } } };
      api.signIn.mockResolvedValueOnce(response);

      await store.dispatch(signin(formData, router));

      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: AUTH, data: response.data.result });
      expect(router.push).toHaveBeenCalledWith('/');
    });

    it('should console log an error on failed signin', async () => {
      const error = 'Test Error';
      api.signIn.mockRejectedValueOnce(error);

      await store.dispatch(signin(formData, router));

      expect(console.log).toHaveBeenCalledWith(error);
    });
  });

  describe('signup', () => {
    const router = { push: jest.fn() };
    const formData = { name: 'Test User', email: 'test@test.com', password: 'testpassword' };

    it('should dispatch AUTH action and push to home page on successful signup', async () => {
      const response = { data: { result: { name: 'Test User' } } };
      api.signUp.mockResolvedValueOnce(response);

      await store.dispatch(signup(formData, router));

      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: AUTH, data: response.data.result });
      expect(router.push).toHaveBeenCalledWith('/');
    });

    it('should console log an error on failed signup', async () => {
      const error = 'Test Error';
      api.signUp.mockRejectedValueOnce(error);

      await store.dispatch(signup(formData, router));

      expect(console.log).toHaveBeenCalledWith(error);
    });
  });

  describe('join', () => {
    const projectId = 'testprojectid';

    it('should dispatch JOIN action on successful join', async () => {
      const response = { data: { result: 'Test Result' } };
      api.join.mockResolvedValueOnce(response);

      await store.dispatch(join(projectId));

      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: JOIN, data: response.data.result });
    });

    it('should console log an error on failed join', async () => {
      const error = 'Test Error';
      api.join.mockRejectedValueOnce(error);

      await store.dispatch(join(projectId));

      expect(console.log).toHaveBeenCalledWith(error);
    });
  });

  describe('leave', () => {
    const projectId = 'testprojectid';

    it('should dispatch LEAVE action on successful leave', async () => {
      const response = { data: { result: 'Test Result' } };
      api.leave.mockResolvedValueOnce(response);

      await store.dispatch(leave(projectId));

      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: LEAVE, data: response.data });
    });
    it('should console.log error when leave fails', async () => {
        const error = 'Test Error';
        console.log = jest.fn();
      
        api.leave.mockRejectedValueOnce(error);
      
        await store.dispatch(leave(projectId));
      
        expect(console.log).toHaveBeenCalledWith(error);
      });
    });
});