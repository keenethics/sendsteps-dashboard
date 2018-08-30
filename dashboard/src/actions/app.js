export function toggleMenu(isOpened) {
    return {
        type: 'TOGGLE_MENU',
        isOpened
    }
}

export function showRegistrationForm(showRegistrationForm) {
    return {
        type: 'SHOW_REGISTRATION_FORM',
        showRegistrationForm
    }
}

export function showPasswordResetForm(showPasswordResetForm) {
    return {
        type: 'SHOW_PASSWORD_RESET_FORM',
        showPasswordResetForm
    }
}

export function setView(currentView) {
    return {
        type: 'SET_VIEW',
        currentView
    }
}
