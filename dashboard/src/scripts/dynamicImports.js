import React, { Component } from 'react';
import DynamicImport from "../pages/base/DynamicImport";
import LoadingView from '../pages/base/LoadingView';


// Use require() vs import. Babel apparently doesn't know how to compile these.

export const Home = props => (
	<DynamicImport load={() => require('../pages/home/Home')}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)


export const PageNotFound = props => (
	<DynamicImport load={() => require("../pages/base/PageNotFound")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const AboutDashboard = props => (
	<DynamicImport load={() => require("../pages/about/dashboard")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const AboutHowItWorks = props => (
	<DynamicImport load={() => require("../pages/about/howitworks")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const AboutSendsteps = props => (
	<DynamicImport load={() => require("../pages/about/sendsteps")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const ResponsesiteLayout = props => (
	<DynamicImport load={() => require("../pages/session-before/responsesite-layout/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const ResponsesiteSettings = props => (
	<DynamicImport load={() => require("../pages/session-before/responsesite-settings/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const AudienceDetails = props => (
	<DynamicImport load={() => require("../pages/session-before/audience-identification/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SurveyOverview = props => (
	<DynamicImport load={() => require("../pages/session-before/surveys/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SurveyDetails = props => (
	<DynamicImport load={() => require("../pages/session-before/surveys/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const ResponsesiteDetails = props => (
	<DynamicImport load={() => require("../pages/session-before/response-website/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const MessageFilterLayout = props => (
	<DynamicImport load={() => require("../pages/session-during/message-filter/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PresentationsOverview = props => (
	<DynamicImport load={() => require("../pages/session-results/presentations/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PresentationsDetails = props => (
	<DynamicImport load={() => require("../pages/session-results/presentations/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SurveyResultsOverview = props => (
	<DynamicImport load={() => require("../pages/session-results/surveys/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

// Superadmin

export const TranslationsOverview = props => (
	<DynamicImport load={() => require("../pages/superadmin/translations/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const TranslationsDetails = props => (
	<DynamicImport load={() => require("../pages/superadmin/translations/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const EditDashboardOverview = props => (
	<DynamicImport load={() => require("../pages/superadmin/edit-dashboard/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const EditDashboardDetails = props => (
	<DynamicImport load={() => require("../pages/superadmin/edit-dashboard/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PhonenumbersOverview = props => (
	<DynamicImport load={() => require("../pages/superadmin/phonenumbers/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PhonenumberDetails = props => (
	<DynamicImport load={() => require("../pages/superadmin/phonenumbers/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const DeleteUsersOverview = props => (
	<DynamicImport load={() => require("../pages/superadmin/delete-users/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SessionOverview = props => (
	<DynamicImport load={() => require("../pages/superadmin/sessions/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SessionDetails = props => (
	<DynamicImport load={() => require("../pages/superadmin/sessions/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const UserOverview = props => (
	<DynamicImport load={() => require("../pages/user/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

