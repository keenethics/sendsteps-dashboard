
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Phonenumbers from "./pages/Phonenumbers";

const Routes = () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/phonenumbers" exact component={Phonenumbers} />
  </Switch>;
  export default Routes;