import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormArticulo from "./Pages/FormArticulo";
import ListArticulos from "./Pages/ListArticulos";
import EditArticulo from "./Pages/EditArticulo";
//redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
function App() {
  return (
    <Router className="App">
      <Provider store={store}>
        <Header />
        <main className="wrapperMain">
          <Switch>
            <Route exact path="/" component={ListArticulos} />
            <Route exact path="/add-productos" component={FormArticulo} />
            <Route exact path="/edit-producto/:id" component={EditArticulo} />
          </Switch>
        </main>
      </Provider>
    </Router>
  );
}

export default App;
