import { combineReducers } from "redux";
import alertaReducer from "./alertaReducer";
import productReducer from "./productReducer";

export default combineReducers({
  products: productReducer,
  alert: alertaReducer,
});
