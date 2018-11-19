import appReducer from './reducers/appReducer';
import apiReducer from './reducers/apiReducer';
import loginReducer from './reducers/loginReducer';
import registrationReducer from './reducers/registrationReducer';
import authReducer from './reducers/authReducer';
import messageFilterReducer from './pages/session-during/message-filter/reducers';
import sessionResultsReducer from './pages/session-results/presentations/reducers';

import responseSettingsReducer from './pages/session-before/responsesite-settings/reducers';
import surveyReducer from './pages/session-before/surveys/reducers';
import siteLayoutReducer from './pages/session-before/responsesite-layout/reducers';
import surveyResultsReducer from './pages/session-results/surveys/reducers';
import translationReducer from './pages/superadmin/translations/reducers';
import dashboardLayoutReducer from './pages/superadmin/edit-dashboard/reducers';
import phonenumberReducer from './pages/superadmin/phonenumbers/reducers';
import sessionOverviewReducer from './pages/superadmin/sessions/reducers';
import audienceReducer from './pages/session-before/audience-identification/reducers';
import userReducer from './pages/user/reducers';
import userManageReducer from './pages/superadmin/delete-users/reducers';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    appReducer,
    apiReducer,
    loginReducer,
    registrationReducer,
    authReducer,
    messageFilterReducer,
    sessionResultsReducer,

    responseSettingsReducer,
    surveyReducer,
    siteLayoutReducer,
    surveyResultsReducer,
    translationReducer,
    dashboardLayoutReducer,
    phonenumberReducer,
    sessionOverviewReducer,
    audienceReducer,
    userReducer,
    userManageReducer
    // Other reducers here
    
});

// Set initial state values here
const initialState = {
    apiReducer: {
        apiError: null,
        isLoading: false,
        data: null
    },
    appReducer: {
        menuOpened: true,
        showRegistrationForm: false,
        togglingView: false
    },
    authReducer: {
        currentUser: null,
        isAuthorized: null,
        isAuthRequired: null,
        authLoading: false,
        securityError: null
    },
    loginReducer: {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        recoveringEmail: '',
        recoveringEmailError: '',
        showPassword: false
    },
    registrationReducer: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        termsAccepted: false,
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: '',
        passwordConfirmError: '',
        termsAcceptedError: '',
        showPassword: false
    },
    sessionResultsReducer: {
        selectedResultIds: []
    },
    messageFilterReducer: {
        selectedIncomingIds: [],
        selectedOnscreenIds: [],
        selectedQueueIds: [],
        selectedAppearedIds: [],
        lastDeletedMessages: null,
        incomingPanelExpanded: false,
        messageModalOpen: false,
        groupModalOpen: false,
        messageGroups: [
            {
                id: 313,
                groupName: 'test_1',
                groupColor: '#EE5500',
            },
            {
                id: 415,
                groupName: 'test_2',
                groupColor: '#99EE33'
            }
        ],
        selectedGroupId: null,
        messages: [
            // {
            //     id: 4141,
            //     connection: null,
            //     destination: "-",
            //     groupId: null,
            //     messageRoundId: 5481,
            //     participantId: 534149,
            //     sessionId: 591,
            //     source: "56b51709fb203035011a1e69f7be1ffc71eb012c",
            //     starred: null,
            //     upvoteCount: 10,
            //     status: "unread",
            //     text: "This is the first message with a veryyyyyyyyyyyyyyyyyyy loooooooooooooooooog message"
            // },
            // {
            //     id: 827234,
            //     connection: null,
            //     destination: "-",
            //     groupId: null,
            //     messageRoundId: 5481,
            //     participantId: 12341,
            //     sessionId: 591,
            //     source: "56b51709fb203035011a1e69f7be1ffc71eb012c",
            //     starred: null,
            //     upvoteCount: 23,
            //     status: "unread",
            //     text: "This is the second message"
            // },
            // {
            //     id: 67151,
            //     connection: null,
            //     destination: "-",
            //     groupId: null,
            //     messageRoundId: 5481,
            //     participantId: 535149,
            //     sessionId: 591,
            //     source: "56b51709fb203035011a1e69f7be1ffc71eb012c",
            //     starred: null,
            //     upvoteCount: 17,
            //     status: "unread",
            //     text: "This is the third message"
            // }
        ]
    }
}
  
const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

export default store;