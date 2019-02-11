const initState = {
    email: 'bryan.overduin@sendsteps.com',
    password: '2RHkuczNRmWTXVtQ'
}

export default function loginReducer(state = initState, action) {
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
        case 'SET_RECOVERING_EMAIL': {
            return {
                ...state,
                recoveringEmail: action.recoveringEmail
            }
        }
        case 'RECOVERING_EMAIL_ERROR': {
            return {
                ...state,
                recoveringEmailError: action.recoveringEmailError
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
        case 'RESET_LOGIN_FORM': {
            return {
                ...state,
                email: '',
                password: '',
                emailError: '',
                passwordError: '',
                recoveringEmail: '',
                recoveringEmailError: '',
                showPassword: false
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}