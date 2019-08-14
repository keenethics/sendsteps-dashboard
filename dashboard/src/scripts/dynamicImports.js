import * as React from 'react'; 
import DynamicImport from "../pages/base/DynamicImport";
import LoadingView from '../pages/base/LoadingView';

export const Home = props => (
	<DynamicImport load={() => import('../pages/home/Home')}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PageNotFound = props => (
	<DynamicImport load={() => import("../pages/base/PageNotFound")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const AboutDashboard = props => (
	<DynamicImport load={() => import("../pages/about/dashboard")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const AboutHowItWorks = props => (
	<DynamicImport load={() => import("../pages/about/howitworks")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const AboutSendsteps = props => (
	<DynamicImport load={() => import("../pages/about/sendsteps")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const ResponsesiteLayout = props => (
	<DynamicImport load={() => import("../pages/session-before/responsesite-layout/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const ResponsesiteSettings = props => (
	<DynamicImport load={() => import("../pages/session-before/responsesite-settings/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const AudienceDetails = props => (
	<DynamicImport load={() => import("../pages/session-before/audience-identification/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SurveyOverview = props => (
	<DynamicImport load={() => import("../pages/session-before/surveys/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SurveyDetails = props => (
	<DynamicImport load={() => import("../pages/session-before/surveys/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const ResponsesiteDetails = props => (
	<DynamicImport load={() => import("../pages/session-before/response-website/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const MessageFilterLayout = props => (
	<DynamicImport load={() => import("../pages/session-during/message-filter/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PresentationsOverview = props => (
	<DynamicImport load={() => import("../pages/session-results/presentations/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PresentationsDetails = props => (
	<DynamicImport load={() => import("../pages/session-results/presentations/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SurveyResultsOverview = props => (
	<DynamicImport load={() => import("../pages/session-results/surveys/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

// Superadmin

export const TranslationsOverview = props => (
	<DynamicImport load={() => import("../pages/superadmin/translations/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const TranslationsDetails = props => (
	<DynamicImport load={() => import("../pages/superadmin/translations/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const EditDashboardOverview = props => (
	<DynamicImport load={() => import("../pages/superadmin/edit-dashboard/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const EditDashboardDetails = props => (
	<DynamicImport load={() => import("../pages/superadmin/edit-dashboard/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PhonenumbersOverview = props => (
	<DynamicImport load={() => import("../pages/superadmin/phonenumbers/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const PhonenumberDetails = props => (
	<DynamicImport load={() => import("../pages/superadmin/phonenumbers/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const DeleteUsersOverview = props => (
	<DynamicImport load={() => import("../pages/superadmin/delete-users/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SessionOverview = props => (
	<DynamicImport load={() => import("../pages/superadmin/sessions/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const SessionDetails = props => (
	<DynamicImport load={() => import("../pages/superadmin/sessions/Details")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const StatisticsOverview = props => (
	<DynamicImport load={() => import("../pages/superadmin/statistics/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)

export const UserOverview = props => (
	<DynamicImport load={() => import("../pages/user/Overview")}>
		{(Component) => Component === null 
		? <LoadingView />
		: <Component {...props} />}
	</DynamicImport>
)