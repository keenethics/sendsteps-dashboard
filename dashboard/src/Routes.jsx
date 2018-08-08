
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import PhonenumbersOverview from "./pages/phonenumbers/Overview";
import Registration from "./pages/registration/Details";
import PhonenumberDetails from "./pages/phonenumbers/Details";


const Routes = () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={Registration} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/phonenumbers" exact component={PhonenumbersOverview} />
    <Route path="/phonenumbers/:phonenumberId" exact component={PhonenumberDetails} />
  </Switch>;
  export default Routes;