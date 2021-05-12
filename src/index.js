import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import App from "./App";
import Login from "./admin/Login";

const rootElement = document.getElementById("root");

const Routing = () => {
  return <Router>
    <Switch>
      <Route path="/admin">
        <Login />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>
}

ReactDOM.render(
  <StrictMode>
    <Routing />
  </StrictMode>,
  rootElement
);
