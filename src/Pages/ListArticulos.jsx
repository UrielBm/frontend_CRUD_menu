import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsAction } from "../actions/productAction";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import "./ListArticulos.scss";
const ListArticulos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getProducts = () => dispatch(GetProductsAction());
    getProducts();
  }, [dispatch]);
  const listProducts = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  return (
    <div className="wrapperList">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="subtitle">Menú</h2>
          {error ? (
            <div className="error">
              <p>Hubo un error al recuperar los datos</p>
            </div>
          ) : null}
          <table className="wrapperTable">
            <thead className="wrapperHead">
              <tr className="tr">
                <th className="th" scope="col">
                  Nombre
                </th>
                <th className="th" scope="col">
                  Descripción
                </th>
                <th className="th" scope="col">
                  Precio
                </th>
              </tr>
            </thead>
            <tbody>
              {listProducts.length === 0 ? (
                <tr>
                  <td></td>
                  <td>No hay productos</td>
                  <td></td>
                </tr>
              ) : (
                listProducts.map((producto) => (
                  <Product key={producto._id} product={producto} />
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListArticulos;
