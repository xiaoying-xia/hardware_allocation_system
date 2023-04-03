import { AUTH, JOIN, LEAVE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData); // data: response, api.singIn: request

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const join = (id) => async (dispatch) => {
  try {
    const { data } = await api.join(id);

    dispatch({ type: JOIN, data });

  } catch (error) {
    console.log(error);
  }
};

export const leave = (id) => async (dispatch) => {
  try {
    const { data } = await api.leave(id);

    dispatch({ type: LEAVE, data });

  } catch (error) {
    console.log(error);
  }
};