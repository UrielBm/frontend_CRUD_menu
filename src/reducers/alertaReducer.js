import { HIDDEN_ALERT, SHOW_ALERT } from "../types";

const initialState = {
  alert: null,
};
function alertaReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case HIDDEN_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
}

export default alertaReducer;
