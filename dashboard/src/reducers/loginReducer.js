export default function loginReducer(state, action) {
    switch(action.type) {
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