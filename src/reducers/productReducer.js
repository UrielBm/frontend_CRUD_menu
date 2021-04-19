// cada reducer tiene suy propio state
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
  GET_EDIT_CORRECT,
  GET_EDIT_ERROR,
} from "../types";
const initialState = {
  products: [],
  error: false,
  loading: false,
  productEliminar: null,
  productActive: { name: "", description: "", price: "" },
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_DOWNLOAD_PRODUCTS:
    case ADD_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCT_CORRECT:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case GET_EDIT_ERROR:
    case GET_DELETE_ERROR:
    case DOWNLOAD_PRODUCTS_ERROR:
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DOWNLOAD_PRODUCTS_CORRECT:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };
    case GET_PRODUCT_DELETE:
      return {
        ...state,
        productEliminar: action.payload,
      };
    case GET_DELETE_CORRECT:
      return {
        ...state,
        products: state.products.filter(
          (producto) => producto._id !== state.productEliminar
        ),
        productEliminar: null,
      };
    case GET_PRODUCT_ACTIVE:
      return {
        ...state,
        productActive: action.payload,
      };
    case GET_EDIT_CORRECT:
      return {
        ...state,
        productActive: { name: "", description: "", price: "" },
        products: state.products.map((product) =>
          product._id === action.payload._id
            ? (product = action.payload)
            : product
        ),
      };
    default:
      return state;
  }
}
export default productReducer;
