import "./App.css";
import DisplayTable from "./components/display-table/displayTable";
import InputForm from "./components/input-form/inputForm";
import { Switch, Route, NavLink } from "react-router-dom";

function App(props) {
  const { path } = props.match;

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="header">Hey! Welcome to CodeZero2pi!</h1>
      </div>
      <div className="links">
        <NavLink to={`${path}/users`} className="link"  activeClassName="active">
          Users Table
        </NavLink>
        <NavLink to={`${path}/input`} className="link" activeClassName="active">
          Input Users
        </NavLink>
      </div>
      <div className="tabs">
        <Switch>
          <Route path={`${path}/users`} exact component={DisplayTable} />
          <Route path={`${path}/input`} component={InputForm} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
