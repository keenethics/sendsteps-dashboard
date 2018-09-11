import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Settings from "./pages/settings/Details";
import PhonenumbersOverview from "./pages/phonenumbers/Overview";
import PhonenumberDetails from "./pages/phonenumbers/Details";

import PresentationsOverview from "./pages/presentations/Overview";
import PresentationsDetails from "./pages/presentations/Details";

import AboutDashboard from "./pages/about/dashboard";
import AboutHowItWorks from "./pages/about/howitworks";
import AboutSendsteps from "./pages/about/sendsteps";
import PageNotFound from "./pages/base/PageNotFound";

const Routes = () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/phonenumbers" exact component={PhonenumbersOverview} />
    <Route path="/phonenumbers/details/:id" exact component={PhonenumberDetails} />
    <Route path="/presentations" exact component={PresentationsOverview} />
    <Route path="/presentations/details/:id" exact component={PresentationsDetails} />

    <Route path="/about/dashboard" exact component={AboutDashboard} />
    <Route path="/about/howitworks" exact component={AboutHowItWorks} />
    <Route path="/about/sendsteps" exact component={AboutSendsteps} />
    <Route path="*" component={PageNotFound} />
  </Switch>;

export default Routes;