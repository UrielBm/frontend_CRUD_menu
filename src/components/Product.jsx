import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GetProductoActivoAction } from "../actions/productAction";
import "./Product.scss";
const Product = ({ product }) => {
  const { name, description, price } = product;
  const history = useHistory();
  const dispatch = useDispatch();
  const handleOnClik = (product) => {
    dispatch(GetProductoActivoAction(product));
    history.push(`/edit-producto/${product._id}`);
  };
  return (
    <tr className="wrapperProduct">
      <td>
        <button
          type="button"
          className="text-link"
          onClick={() => handleOnClik(product)}
        >
          {name}
        </button>
      </td>
      <td>{description ? description : "sin descripción"}</td>
      <td>$ {price}</td>
      <td className="wrapperActions"></td>
    </tr>
  );
};

export default Product;
