export function setEmail(email) { 
    return {
        type: 'SET_EMAIL',
        email
    }
}

export function setPassword(password) {
    return {
        type: 'SET_PASSWORD',
        password
    }
}

export function setEmailError(emailError) {
    return {
        type: 'EMAIL_ERROR',
        emailError
    }
}

export function setRecoveringEmail(recoveringEmail) {
    return {
        type: 'SET_RECOVERING_EMAIL',
        recoveringEmail
    }
}

export function setRecoveringEmailError(recoveringEmailError) {
    return {
        type: 'RECOVERING_EMAIL_ERROR',
        recoveringEmailError
    }
}

export function setPasswordError(passwordError) {
    return {
        type: 'PASSWORD_ERROR',
        passwordError
    }
}

export function showPassword(showPassword) {
    return {
        type: 'SHOW_PASSWORD',
        showPassword
    }
}

export function resetLoginForm() {
    return {
        type: 'RESET_LOGIN_FORM'
    }
}
