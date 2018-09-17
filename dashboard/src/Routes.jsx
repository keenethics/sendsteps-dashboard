import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/base/PageNotFound";

// About
import AboutDashboard from "./pages/about/dashboard";
import AboutHowItWorks from "./pages/about/howitworks";
import AboutSendsteps from "./pages/about/sendsteps";
// Before Session
import ResponsesiteLayout from "./pages/session-before/responsesite-layout/Details";
import ResponsesiteSettings from "./pages/session-before/responsesite-settings/Details";
import SurveyOverview from "./pages/session-before/surveys/Overview";
import SurveyDetails from "./pages/session-before/surveys/Details";
// After Session
import PresentationsOverview from "./pages/session-results/presentations/Overview";
import PresentationsDetails from "./pages/session-results/presentations/Details";
import SurveyResultsOverview from "./pages/session-results/surveys/Overview";
// Superadmin
import PhonenumbersOverview from "./pages/superadmin/phonenumbers/Overview";
import PhonenumberDetails from "./pages/superadmin/phonenumbers/Details";
import DeleteUsersOverview from "./pages/superadmin/delete-users/Overview";
import EditDashboardOverview from "./pages/superadmin/edit-dashboard/Overview";
import EditDashboardDetails from "./pages/superadmin/edit-dashboard/Details";
import SessionOverview from "./pages/superadmin/sessions/Overview";
//User & Dropdown Menu
import UserProfile from "./pages/user/Profile";


const Routes = () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/session-before/responsesite-layout" exact component={ResponsesiteLayout} />
    <Route path="/session-before/responsesite-settings" exact component={ResponsesiteSettings} />
    <Route path="/session-before/surveys" exact component={SurveyOverview} />
    <Route path="/session-before/surveys/details/:id" exact component={SurveyDetails} />
    <Route path="/superadmin/phonenumbers" exact component={PhonenumbersOverview} />
    <Route path="/superadmin/phonenumbers/details/:id" exact component={PhonenumberDetails} />
    <Route path="/superadmin/edit-dashboard" exact component={EditDashboardOverview} />
    <Route path="/superadmin/edit-dashboard/details/:id" exact component={EditDashboardDetails} />
    <Route path="/superadmin/delete-users" exact component={DeleteUsersOverview} />
    <Route path="/superadmin/sessions" exact component={SessionOverview} />
    <Route path="/session-results/presentations" exact component={PresentationsOverview} />
    <Route path="/session-results/presentations/details/:id" exact component={PresentationsDetails} />
    <Route path="/session-results/surveys" exact component={SurveyResultsOverview} />
    <Route path="/about/dashboard" exact component={AboutDashboard} />
    <Route path="/about/howitworks" exact component={AboutHowItWorks} />
    <Route path="/about/sendsteps" exact component={AboutSendsteps} />
    <Route path="/user/edit-profile" exact component={UserProfile} />
    <Route path="*" component={PageNotFound} />
  </Switch>;

export default Routes;