import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert, hiddenAlertAction } from "../actions/alertaActions";
import { createNewProductAction } from "../actions/productAction";
import Spinner from "../components/Spinner";
import "./FormArticulo.scss";
const FormArticulo = ({ history }) => {
  //use del dispatch para llamar a la función del accion
  const dispatch = useDispatch();
  //Manda a llamar el action de productAction
  const AddProduct = (producto) => dispatch(createNewProductAction(producto));
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alert = useSelector((state) => state.alert.alert);
  const [producto, setProducto] = useState({
    name: "",
    description: "",
    price: "",
  });
  const { name, description, price } = producto;
  const handleOnChange = (e) => {
    let { value, name } = e.target;
    if (name === "price") {
      value = Number(value);
    } else {
      value = value.toLowerCase();
    }
    setProducto({
      ...producto,
      [name]: value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    //validar form
    if (name.trim() === "" || price <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger",
      };
      dispatch(showAlert(alerta));
      return;
    }
    // validación quitar errores
    dispatch(hiddenAlertAction());
    //uso de la fución para agregar a la base de datos
    AddProduct(producto);
    setProducto({
      name: "",
      description: "",
      price: "",
    });
    history.push("/");
  };
  return (
    <div className="FormWrapper">
      <h2 className="subtitle">Crea un nuevo Producto</h2>
      {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
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
            Registrar
          </button>
        </div>
      </form>
      {loading ? (
        <section>
          <Spinner />
          <span>Registrando</span>
        </section>
      ) : null}
      {error ? <p>Hubo un Error al registrar el producto</p> : null}
    </div>
  );
};

export default FormArticulo;
