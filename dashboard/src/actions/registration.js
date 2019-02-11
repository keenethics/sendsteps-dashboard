
import { authLoading } from './auth';

export function setFirstName(firstName) {
    return {
        type: 'SET_FIRST_NAME',
        firstName
    }
}

export function setLastName(lastName) {
    return {
        type: 'SET_LAST_NAME',
        lastName
    }
}

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

export function setPasswordConfirm(passwordConfirm) {
    return {
        type: 'SET_PASSWORD_CONFIRM',
        passwordConfirm
    }
}

export function setAcceptTerms(termsAccepted) {
    return {
        type: 'ACCEPT_TERMS',
        termsAccepted
    }
}

export function showPassword(showPassword) {
    return {
        type: 'SHOW_PASSWORD',
        showPassword
    }
}

export function setFirstNameError(firstNameError) {
    return {
        type: 'FIRST_NAME_ERROR',
        firstNameError
    }
}

export function setLastNameError(lastNameError) {
    return {
        type: 'LAST_NAME_ERROR',
        lastNameError
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

export function setPasswordConfirmError(passwordConfirmError) {
    return {
        type: 'PASSWORD_CONFIRM_ERROR',
        passwordConfirmError
    }
}

export function setAcceptTermsError(termsAcceptedError) {
    return {
        type: 'ACCEPT_TERMS_ERROR',
        termsAcceptedError
    }
}

export function setGeneralError(generalError) {
    return { 
        type: 'GENERAL_ERROR',
        generalError
    }
}

export function resetRegistrationForm() {
    return {
        type: 'RESET_REGISTRATION_FORM'
    }
}

export function setErrors(errors) {
    return dispatch => {
        if(errors.firstName) { dispatch(setFirstNameError(errors.firstName))}
        if(errors.lastName) { dispatch(setLastNameError(errors.lastName))}
        if(errors.email) { dispatch(setEmailError(errors.email))}
        if(errors.errorPassword) { dispatch(setPasswordError(errors.errorPassword))}
        if(errors.passwordConfirm) { dispatch(setPasswordConfirmError(errors.passwordConfirm))}
        if(errors.termsAccepted) { dispatch(setAcceptTermsError(errors.termsAccepted))}
        if(errors.errorGeneral) { dispatch(setGeneralError(errors))};
        dispatch(authLoading(false));
    }
}
