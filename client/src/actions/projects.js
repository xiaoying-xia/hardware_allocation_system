import { FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';

import * as api from "../api";

// Action Creators
export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProjects();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    const { data } = await api.createProject(project);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProject = (id, project) => async (dispatch) => {
  try {
    const { data } = await api.updateProject(id, project);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

