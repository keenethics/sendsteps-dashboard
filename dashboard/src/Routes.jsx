import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { isSuperAdmin } from './scripts/roleHelper';
import BreadcrumbsProvider from './pages/base/BreadcrumbsProvider';
import * as pages from './scripts/dynamicImports';

class Routes extends React.Component {

	render() {

		const { currentUser } = this.props;

		return (
			<BrowserRouter>
				<BreadcrumbsProvider>
					<Switch>
						<Route path="/" exact component={pages.Home} />
						<Route path="/session-before/responsesite-layout" exact component={pages.ResponsesiteLayout} />
						<Route path="/session-before/responsesite-settings" exact component={pages.ResponsesiteSettings} />
						<Route path="/session-before/surveys" exact component={pages.SurveyOverview} />
						<Route path="/session-before/surveys/details/:id" exact component={pages.SurveyDetails} />

						<Route path="/session-before/audience-identification" exact component={pages.AudienceDetails} />
						<Route path="/session-before/response" exact component={pages.ResponsesiteDetails} />
						<Route path="/session-during/message-filter" exact component={pages.MessageFilterLayout} />
						
						<Route path="/session-results/presentations" exact component={pages.PresentationsOverview} />
						<Route path="/session-results/presentations/details/:id" exact component={pages.PresentationsDetails} />
						<Route path="/session-results/surveys" exact component={pages.SurveyResultsOverview} />
						<Route path="/about/dashboard" exact component={pages.AboutDashboard} />
						<Route path="/about/howitworks" exact component={pages.AboutHowItWorks} />
						<Route path="/about/sendsteps" exact component={pages.AboutSendsteps} />
						<Route path="/user/edit-profile" exact component={pages.UserOverview} />
						{isSuperAdmin(currentUser) && <>
							<Route path="/superadmin/translations" exact component={pages.TranslationsOverview} />
							<Route path="/superadmin/translations/details/:id" exact component={pages.TranslationsDetails} />
							<Route path="/superadmin/edit-dashboard" exact component={pages.EditDashboardOverview} />
							<Route path="/superadmin/edit-dashboard/details/:id" exact component={pages.EditDashboardDetails} />
							<Route path="/superadmin/phonenumbers" exact component={pages.PhonenumbersOverview} />
							<Route path="/superadmin/phonenumbers/details/:id" exact component={pages.PhonenumberDetails} />
							<Route path="/superadmin/delete-users" exact component={pages.DeleteUsersOverview} />
							<Route path="/superadmin/sessions" exact component={pages.SessionOverview} />
							<Route path="/superadmin/sessions/details/:id" exact component={pages.SessionDetails} />
							<Route path="/superadmin/statistics" exact component={pages.StatisticsOverview} />
						</>}				
						<Route component={pages.PageNotFound} />
					</Switch>
				</BreadcrumbsProvider>
		</BrowserRouter>

		)
	}
}
	
export default connect(
	(state) => {
		return {
			currentUser: state.authReducer.currentUser
		}
	}
) (Routes);