import { GETAVAIL, SETAVAIL } from "../constants/actionTypes";

import * as api from "../api";

// Action Creators
export const getAvailability = () => async (dispatch) => {
  try {
    const { data } = await api.getAvailability();
    dispatch({ type: GETAVAIL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const setAvailability = (availability) => async (dispatch) => {
  try {
    // console.log(availability)
    const { data } = await api.setAvailability(availability);
    dispatch({ type: SETAVAIL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
