import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  deleteProductAction,
  updateProductAction,
} from "../actions/productAction";
import Swal from "sweetalert2";
import "./FormArticulo.scss";
import { useEffect, useState } from "react";

const EditArticulo = ({ history }) => {
  const { id } = useParams();
  const [newProduct, setnewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const dispatch = useDispatch();
  const productoSelect = useSelector((state) => state.products.productActive);
  useEffect(() => {
    setnewProduct(productoSelect);
  }, [productoSelect]);
  const { name, description, price } = newProduct;
  const handleOnClick = (id) => {
    //preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro de Eliminar?",
      text: "No podras revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1851b9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimnarlo",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteProductAction(id));
        history.push("/");
      }
    });
  };
  const handleOnChange = (e) => {
    if (e.target.name === "price") {
      e.target.value = Number(e.target.value);
    } else {
      e.target.value = e.target.value.toLowerCase();
    }
    setnewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || price <= 0) {
      return;
    }
    dispatch(updateProductAction(newProduct));
    history.push("/");
  };
  return (
    <div className="FormWrapper">
      <h2 className="subtitle">Editar el Producto {productoSelect.name}</h2>
      <form className="wrapperForm" onSubmit={handleOnSubmit}>
        <div className="wrapperBasic">
          <div className="wrapperInput">
            <label htmlFor="name" className="label">
              Nombre del producto:
            </label>

            <input
              type="text"
              placeholder="Nombre del producto"
              name="name"
              id="name"
              className="input"
              value={name}
              onChange={handleOnChange}
            />
          </div>
          <div className="wrapperInput">
            <label htmlFor="price" className="label">
              precio:
            </label>
            <input
              type="number"
              placeholder="Ingresa el precio"
              name="price"
              id="price"
              className="input"
              value={price}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="wrapperDescription">
          <div className="wrapperInputDescription">
            <label htmlFor="description" className="label">
              Descripción del producto:
            </label>
            <textarea
              type="description"
              placeholder="Ingresa la descripción"
              name="description"
              id="description"
              maxLength="80"
              className="textArea"
              value={description}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="wrapperButton">
          <button type="submit" className="btn-register">
            Editar
          </button>
        </div>
        <div className="wrapperButton">
          <button
            type="button"
            className="btn-delete"
            onClick={() => handleOnClick(id)}
          >
            Eliminar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticulo;
