export default function registrationReducer(state, action) {

    // console.log(action);
    switch(action.type) {
        case 'SET_FIRST_NAME': {
            return {
                ...state,
                firstName: action.firstName
            }
        }
        case 'SET_LAST_NAME': {
            return {
                ...state,
                lastName: action.lastName
            }
        }
        case 'SET_EMAIL': {
            return {
                ...state,
                email: action.email
            }
        }
        case 'SET_PASSWORD': {
            return {
                ...state,
                password: action.password
            }
        }
        case 'SET_PASSWORD_CONFIRM': {
            return {
                ...state,
                passwordConfirm: action.passwordConfirm
            }
        }
        case 'FIRST_NAME_ERROR': {
            return {
                ...state,
                firstNameError: action.firstNameError
            }
        }
        case 'LAST_NAME_ERROR': {
            return {
                ...state,
                lastNameError: action.lastNameError
            }
        }
        case 'EMAIL_ERROR': {
            return {
                ...state,
                emailError: action.emailError
            }
        }
        case 'PASSWORD_ERROR': {
            return {
                ...state,
                passwordError: action.passwordError
            }
        }
        case 'PASSWORD_CONFIRM_ERROR': {
            return {
                ...state,
                passwordConfirmError: action.passwordConfirmError
            }
        }
        case 'SHOW_PASSWORD': {
            return {
                ...state,
                showPassword: action.showPassword
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}