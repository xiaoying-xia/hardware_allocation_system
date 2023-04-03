import * as actionType from "../constants/actionTypes";

export default (projects = [], action) => {
  switch (action.type) {
    case actionType.FETCH_ALL:
      return action.payload;
    case actionType.CREATE:
      return [...projects, action.payload];
    case actionType.UPDATE:
      return projects.map((project) =>
        project._id === action.payload._id ? action.payload : project
      );
    default:
      return projects;
  }
};
