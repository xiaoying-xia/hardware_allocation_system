import authReducer from "./auth.js";
import * as actionTypes from "../constants/actionTypes";
describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
      authData: null,
    });
  });

  it("should handle AUTH action", () => {
    const mockData = {
      name: "John",
      email: "john@example.com",
      token: "abc123",
    };
    const action = {
      type: actionTypes.AUTH,
      data: mockData,
    };
    const expectedState = {
      authData: mockData,
      loading: false,
      errors: null,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle LOGOUT action", () => {
    const mockState = {
      authData: {
        name: "John",
        email: "john@example.com",
        token: "abc123",
      },
      loading: false,
      errors: null,
    };
    const action = {
      type: actionTypes.LOGOUT,
    };
    const expectedState = {
      authData: null,
      loading: false,
      errors: null,
    };
    expect(authReducer(mockState, action)).toEqual(expectedState);
  });
});
