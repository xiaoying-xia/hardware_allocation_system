import * as actionType from "../constants/actionTypes";

export default (inProjects = [], action) => {
  switch (action.type) {
    case actionType.JOIN:
      return action.payload;
    case actionType.LEAVE:
      localStorage.setItem("inProject", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    default:
      return projects;
  }
};
