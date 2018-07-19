
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Phonenumbers from "./pages/Phonenumbers";
import PhonenumberOverview from "./pages/PhonenumberOverview";


const Routes = () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/phonenumbers" exact component={Phonenumbers} />
    <Route path="/phonenumbers/:phonenumber" exact component={PhonenumberOverview} />

  </Switch>;
  export default Routes;