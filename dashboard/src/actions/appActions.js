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