import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Settings from "./pages/settings/Details";
import PhonenumbersOverview from "./pages/phonenumbers/Overview";
import Registration from "./pages/registration/Details";
import PhonenumberDetails from "./pages/phonenumbers/Details";


import AboutDashboard from "./pages/about/dashboard";
import AboutHowItWorks from "./pages/about/howitworks";
import AboutSendsteps from "./pages/about/sendsteps";


const Routes = () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={Registration} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/phonenumbers" exact component={PhonenumbersOverview} />
    <Route path="/phonenumbers/details/:id" exact component={PhonenumberDetails} />
    
    
    <Route path="/about/dashboard" exact component={AboutDashboard} />
    <Route path="/about/howitworks" exact component={AboutHowItWorks} />
    <Route path="/about/sendsteps" exact component={AboutSendsteps} />
  </Switch>;

export default Routes;