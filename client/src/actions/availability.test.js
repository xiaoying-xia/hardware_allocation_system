// availabilityActions.test.js
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";

import { getAvailability, setAvailability } from "./availability";
import * as api from "../api";
import { GETAVAIL, SETAVAIL } from "../constants/actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const baseURL = 'http://localhost:5000';
describe("availability actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("creates GETAVAIL action when fetching availability", async () => {
    const data = [
      { _id: "1", availability: 10 },
      { _id: "2", availability: 20 },
    ];

    nock(baseURL)
      .get("/availability")
      .reply(200, data);

    const expectedActions = [
      { type: GETAVAIL, payload: data },
    ];

    const store = mockStore({ availability: [] });

    await store.dispatch(getAvailability());

    expect(store.getActions());
  });

  it("creates SETAVAIL action when setting availability", async () => {
    const availability = [
      { _id: "1", availability: 15 },
      { _id: "2", availability: 25 },
    ];

    nock(baseURL)
      .put("/availability")
      .reply(200, availability);

    const expectedActions = [
      { type: SETAVAIL, payload: availability },
    ];

    const store = mockStore({ availability: [] });

    await store.dispatch(setAvailability(availability));

    expect(store.getActions());
  });
});
