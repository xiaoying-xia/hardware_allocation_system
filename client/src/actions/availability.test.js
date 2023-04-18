import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../availability';
import * as api from '../../api';
import { GETAVAIL, SETAVAIL } from '../../constants/actionTypes';

const mockStore = configureMockStore([thunk]);

describe('availability actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAvailability', () => {
    it('should dispatch GETAVAIL action on successful request', async () => {
      const mockData = [{ hwset: 'hw1', availability: 2 }, { hwset: 'hw2', availability: 0 }];
      api.getAvailability = jest.fn().mockResolvedValueOnce({ data: mockData });

      await store.dispatch(actions.getAvailability());

      const expectedActions = [{ type: GETAVAIL, payload: mockData }];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should console log error message on failed request', async () => {
      const mockError = new Error('Failed to fetch availability');
      console.log = jest.fn();
      api.getAvailability = jest.fn().mockRejectedValueOnce(mockError);

      await store.dispatch(actions.getAvailability());

      expect(console.log).toHaveBeenCalledWith(mockError.message);
    });
  });

  describe('setAvailability', () => {
    it('should dispatch SETAVAIL action on successful request', async () => {
      const mockData = { hwset: 'hw1', availability: 2 };
      const mockAvailability = [{ hwset: 'hw1', availability: 2 }, { hwset: 'hw2', availability: 0 }];
      api.setAvailability = jest.fn().mockResolvedValueOnce({ data: mockData });

      await store.dispatch(actions.setAvailability(mockAvailability));

      const expectedActions = [{ type: SETAVAIL, payload: mockData }];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should console log error message on failed request', async () => {
      const mockError = new Error('Failed to set availability');
      console.log = jest.fn();
      api.setAvailability = jest.fn().mockRejectedValueOnce(mockError);

      await store.dispatch(actions.setAvailability());

      expect(console.log).toHaveBeenCalledWith(mockError.message);
    });
  });
});
