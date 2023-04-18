import availabilityReducer from './availability';
import * as actionTypes from '../constants/actionTypes';

describe('availability reducer', () => {
  it('should return the initial state', () => {
    expect(availabilityReducer(undefined, {})).toEqual([]);
  });

  it('should handle GETAVAIL', () => {
    const availData = ['availability1', 'availability2'];
    const action = {
      type: actionTypes.GETAVAIL,
      payload: availData
    };

    expect(availabilityReducer([], action)).toEqual(availData);
  });

  it('should handle SETAVAIL', () => {
    const availData = ['availability1', 'availability2'];
    const action = {
      type: actionTypes.SETAVAIL,
      payload: availData
    };

    expect(availabilityReducer([], action)).toEqual(availData);
  });
});
