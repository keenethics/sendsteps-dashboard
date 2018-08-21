import appReducer from './reducers/appReducer';
import apiReducer from './reducers/apiReducer';
import loginReducer from './reducers/loginReducer';
import registrationReducer from './reducers/registrationReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    appReducer: appReducer,
    apiReducer: apiReducer,
    loginReducer: loginReducer,
    registrationReducer: registrationReducer
    // Other reducers here
});

// Set initial state values here
const initialState = {
    appReducer: {
        menuOpened: false,
        showRegistrationForm: false,
        togglingView: false
    },
    apiReducer: {
        apiError: null,
        isLoading: false
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
  
const store = createStore(rootReducer, initialState);

export default store;