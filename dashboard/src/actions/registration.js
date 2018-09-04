import fetch from 'cross-fetch';
import { authLoading, authorizeLogin } from './auth';

let authUrl = 'http://local-bastet.sendsteps.com/index.php';

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
        if(errors.password) { dispatch(setPasswordError(errors.password))}
        if(errors.passwordConfirm) { dispatch(setPasswordConfirmError(errors.passwordConfirm))}
        if(errors.termsAccepted) { dispatch(setAcceptTermsError(errors.termsAccepted))}
        if(errors) { dispatch(setGeneralError(errors))};
    }
}

export function register(firstName, lastName, email, password, passwordConfirm, termsAccepted) {

    const registerParams = JSON.stringify({
        // Same as firstName: firstName
        email,
        password,
        passwordConfirm,
        options: {
            firstName,
            lastName,
            termsAccepted,
        }
    });

    console.log(registerParams);

    return dispatch => {
        fetch(authUrl,{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: 'function=register&params='+registerParams
        }).then(res => {
            return res.json()
        }).then(
            (result) => {
                if(result.content) {
                    // Log user in if authorized, (Still need to write auth above here)
                    dispatch(authorizeLogin(email, password));
                } else if(result.error) {
                    // If errors are returned from the API, 
                    // dispatch them to the user
                    dispatch(setErrors(result.error));
                    dispatch(authLoading(false));
                }
            },
            (error) => {
                // dispatch errors
                dispatch(setErrors(error));
                dispatch(authLoading(false));
            }
        )
    }
}
