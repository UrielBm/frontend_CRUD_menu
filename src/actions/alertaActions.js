import { HIDDEN_ALERT, SHOW_ALERT } from "../types";

//muestra alerta
export function showAlert(alerta) {
  return (dispatch) => {
    dispatch(showAlertaError(alerta));
  };
}
const showAlertaError = (alerta) => ({
  type: SHOW_ALERT,
  payload: alerta,
});

// ocultar alerta

export function hiddenAlertAction() {
  return (dispatch) => {
    dispatch(hiddenAlert());
  };
}
const hiddenAlert = () => ({
  type: HIDDEN_ALERT,
});
