import appReducer from './reducers/appReducer';
import apiReducer from './reducers/apiReducer';
import loginReducer from './reducers/loginReducer';
import registrationReducer from './reducers/registrationReducer';
import authReducer from './reducers/authReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    appReducer: appReducer,
    apiReducer: apiReducer,
    loginReducer: loginReducer,
    registrationReducer: registrationReducer,
    authReducer: authReducer
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
        menuOpened: false,
        showRegistrationForm: false,
        togglingView: false
    },
    authReducer: {
        isAuthorized: null,
        authRequired: null
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
    }
}
  
const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

export default store;