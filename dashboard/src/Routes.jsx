import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/base/PageNotFound";

// About
import AboutDashboard from "./pages/about/dashboard";
import AboutHowItWorks from "./pages/about/howitworks";
import AboutSendsteps from "./pages/about/sendsteps";
// Before Session
import Settings from "./pages/session-before/response-settings/Details";
import SurveyOverview from "./pages/session-before/surveys/Overview";
// After Session
import PresentationsOverview from "./pages/session-results/presentations/Overview";
import PresentationsDetails from "./pages/session-results/presentations/Details";
import SurveyResultsOverview from "./pages/session-results/surveys/Overview";
// Superadmin
import PhonenumbersOverview from "./pages/superadmin/phonenumbers/Overview";
import PhonenumberDetails from "./pages/superadmin/phonenumbers/Details";

const Routes = () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/session-before/response-settings" exact component={Settings} />
    <Route path="/session-before/survey" exact component={SurveyOverview} />
    <Route path="/superadmin/phonenumbers" exact component={PhonenumbersOverview} />
    <Route path="/superadmin/phonenumbers/details/:id" exact component={PhonenumberDetails} />
    <Route path="/session-results/presentations" exact component={PresentationsOverview} />
    <Route path="/session-results/presentations/details/:id" exact component={PresentationsDetails} />
    <Route path="/session-results/surveys" exact component={SurveyResultsOverview} />
    <Route path="/about/dashboard" exact component={AboutDashboard} />
    <Route path="/about/howitworks" exact component={AboutHowItWorks} />
    <Route path="/about/sendsteps" exact component={AboutSendsteps} />
    <Route path="*" component={PageNotFound} />
  </Switch>;

export default Routes;