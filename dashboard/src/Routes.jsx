
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Phonenumbers from "./pages/phonenumbers/Phonenumbers";
import RegistrationOverview from "./pages/registration/RegistrationOverview";
import PhonenumberOverview from "./pages/phonenumbers/PhonenumberOverview";


const Routes = () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={RegistrationOverview} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/phonenumbers" exact component={Phonenumbers} />
    <Route path="/phonenumbers/:phonenumberId" exact component={PhonenumberOverview} />
  </Switch>;
  export default Routes;