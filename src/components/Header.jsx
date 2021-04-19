import { Link } from "react-router-dom";
import "./Style.scss";
const Header = () => {
  return (
    <header className="wrapperHeader">
      <Link to="/" className="title">
        <h1>App CRUD Restaurant</h1>
      </Link>
      <Link to="/add-productos" className="Button-add">
        Agregar Productos &#43;
      </Link>
    </header>
  );
};

export default Header;
