import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/base/PageNotFound";
import BreadcrumbsProvider from "./pages/base/BreadcrumbsProvider";

// About
import AboutDashboard from "./pages/about/dashboard";
import AboutHowItWorks from "./pages/about/howitworks";
import AboutSendsteps from "./pages/about/sendsteps";
// Before Session
import ResponsesiteLayout from "./pages/session-before/responsesite-layout/Details";
import ResponsesiteSettings from "./pages/session-before/responsesite-settings/Details";
import AudienceDetails from "./pages/session-before/audience-identification/Details";
import SurveyOverview from "./pages/session-before/surveys/Overview";
import SurveyDetails from "./pages/session-before/surveys/Details";
import ResponsesiteDetails from "./pages/session-before/response-website/Details";
// After Session
import PresentationsOverview from "./pages/session-results/presentations/Overview";
import PresentationsDetails from "./pages/session-results/presentations/Details";
import SurveyResultsOverview from "./pages/session-results/surveys/Overview";
// Superadmin
import TranslationsOverview from "./pages/superadmin/translations/Overview";
import TranslationsDetails from "./pages/superadmin/translations/Details";
import EditDashboardOverview from "./pages/superadmin/edit-dashboard/Overview";
import EditDashboardDetails from "./pages/superadmin/edit-dashboard/Details";
import PhonenumbersOverview from "./pages/superadmin/phonenumbers/Overview";
import PhonenumberDetails from "./pages/superadmin/phonenumbers/Details";
import DeleteUsersOverview from "./pages/superadmin/delete-users/Overview";
import SessionOverview from "./pages/superadmin/sessions/Overview";
import SessionDetails from "./pages/superadmin/sessions/Details";
//User & Dropdown Menu
import UserProfile from "./pages/user/Profile";


const Routes = () =>
  	<BrowserRouter>
		<BreadcrumbsProvider>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/session-before/responsesite-layout" exact component={ResponsesiteLayout} />
				<Route path="/session-before/responsesite-settings" exact component={ResponsesiteSettings} />
				<Route path="/session-before/surveys" exact component={SurveyOverview} />
				<Route path="/session-before/audience-identification" exact component={AudienceDetails} />
				<Route path="/session-before/surveys/details/:id" exact component={SurveyDetails} />
				<Route path="/session-before/response" exact component={ResponsesiteDetails} />
				<Route path="/superadmin/translations" exact component={TranslationsOverview} />
				<Route path="/superadmin/translations/details/:id" exact component={TranslationsDetails} />
				<Route path="/superadmin/edit-dashboard" exact component={EditDashboardOverview} />
				<Route path="/superadmin/edit-dashboard/details/:id" exact component={EditDashboardDetails} />
				<Route path="/superadmin/phonenumbers" exact component={PhonenumbersOverview} />
				<Route path="/superadmin/phonenumbers/details/:id" exact component={PhonenumberDetails} />
				<Route path="/superadmin/delete-users" exact component={DeleteUsersOverview} />
				<Route path="/superadmin/sessions" exact component={SessionOverview} />
				<Route path="/superadmin/sessions/details/:id" exact component={SessionDetails} />
				<Route path="/session-results/presentations" exact component={PresentationsOverview} />
				<Route path="/session-results/presentations/details/:id" exact component={PresentationsDetails} />
				<Route path="/session-results/surveys" exact component={SurveyResultsOverview} />
				<Route path="/about/dashboard" exact component={AboutDashboard} />
				<Route path="/about/howitworks" exact component={AboutHowItWorks} />
				<Route path="/about/sendsteps" exact component={AboutSendsteps} />
				<Route path="/user/edit-profile" exact component={UserProfile} />
				<Route component={PageNotFound} />
			</Switch>
		</BreadcrumbsProvider>
  </BrowserRouter>;

export default Routes;