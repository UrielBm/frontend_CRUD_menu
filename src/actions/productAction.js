import ClienteAxios from "../config/axios";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_CORRECT,
  ADD_PRODUCT_ERROR,
  INIT_DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_CORRECT,
  DOWNLOAD_PRODUCTS_ERROR,
  GET_PRODUCT_DELETE,
  GET_DELETE_CORRECT,
  GET_DELETE_ERROR,
  GET_PRODUCT_ACTIVE,
  START_PRODUCT_EDIT,
  GET_EDIT_CORRECT,
  GET_EDIT_ERROR,
} from "../types";
import Swal from "sweetalert2";
// crear nuevos froductos

export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());
    try {
      //llamada al bac-end con axios
      const response = await ClienteAxios.post("products/add", product);
      dispatch(addProductCorrect(response.data));
      Swal.fire(
        "Registro realizado",
        "Se realizo el registro correctamente",
        "success"
      );
    } catch (error) {
      console.log(error.response);
      dispatch(addProductError(true));
      //alert error
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: "Hubo un error al registrar el produto nuevo",
      });
    }
  };
}
const addProduct = () => ({
  type: ADD_PRODUCT,
});
// si agregar producto fue exitoso
const addProductCorrect = (product) => ({
  type: ADD_PRODUCT_CORRECT,
  payload: product,
});
//si hubo un error
const addProductError = (state) => ({
  type: ADD_PRODUCT_ERROR,
  payload: state,
});

// funcion GET de productos

export function GetProductsAction() {
  return async (dispatch) => {
    dispatch(dowloadProducts());
    try {
      const response = await ClienteAxios.get("products");
      dispatch(downloadProductsRight(response.data));
    } catch (error) {
      console.log(error.response);
      dispatch(downloadProductsError());
    }
  };
}
const dowloadProducts = () => ({
  type: INIT_DOWNLOAD_PRODUCTS,
});
const downloadProductsRight = (listproducts) => ({
  type: DOWNLOAD_PRODUCTS_CORRECT,
  payload: listproducts,
});
const downloadProductsError = () => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: true,
});

export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(getProductDelete(id));
    try {
      await ClienteAxios.delete(`products/delete/${id}`);
      dispatch(deleteRight());
      //Si se elimina
      Swal.fire("Eliminado!", "Tu producto ha sido elimado", "success");
    } catch (error) {
      console.log(error.response);
      dispatch(getDeleteError());
    }
  };
}
const getProductDelete = (id) => ({
  type: GET_PRODUCT_DELETE,
  payload: id,
});
const deleteRight = () => ({
  type: GET_DELETE_CORRECT,
});
const getDeleteError = () => ({
  type: GET_DELETE_ERROR,
  payload: true,
});

export function GetProductoActivoAction(producto) {
  return async (dispatch) => {
    dispatch(getProductoActivo(producto));
  };
}
const getProductoActivo = (product) => ({
  type: GET_PRODUCT_ACTIVE,
  payload: product,
});

export function updateProductAction(producto) {
  return async (dispatch) => {
    dispatch(updateProducto());
    try {
      await ClienteAxios.put(`products/update/${producto._id}`, producto);
      dispatch(updateRight(producto));
    } catch (error) {
      console.log(error.response);
      dispatch(updateError());
    }
  };
}
const updateProducto = () => ({
  type: START_PRODUCT_EDIT,
});
const updateRight = (producto) => ({
  type: GET_EDIT_CORRECT,
  payload: producto,
});
const updateError = () => ({
  type: GET_EDIT_ERROR,
  payload: true,
});
