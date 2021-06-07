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
import Root from "./admin/segurity/Root";
import AuthContextProvider from "./admin/context/auth";
import SegurityRouter from "./admin/segurity/segurityRouter";
import Main from "./admin/Main";
import Admin from "./admin";

const rootElement = document.getElementById("root");



const Routing = () => {
  return <AuthContextProvider>
    <Root>
      <Router>

        <Switch>
          <SegurityRouter path="/login" component={Login} type="public" exact={false} />
          <SegurityRouter path="/admin" component={Admin} type="private" exact={false} />
          <Route path="/" component={() => <App />} exact={true} />
        </Switch>
      </Router>
    </Root>
  </AuthContextProvider>
}

ReactDOM.render(
  <StrictMode>
    <Routing />
  </StrictMode>,
  rootElement
);
