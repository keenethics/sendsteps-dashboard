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