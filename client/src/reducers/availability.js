import * as actionType from "../constants/actionTypes";

export default (availability = [], action) => {
  switch (action.type) {
    case actionType.GETAVAIL:
      return action.payload;
    case actionType.SETAVAIL:
      return action.payload;
    default:
      return availability;
  }
};
