import { setNewData } from '../actions/api';

export function setField(fieldName, event) {
    if(event.target && event.target.value){
        this.props.dispatch(setNewData({[fieldName]: event.target.value}));
    } else {
        this.props.dispatch(setNewData({[fieldName]: event}));
    }
}

export function toggleMenu(isOpened) {
    return {
        type: 'TOGGLE_MENU',
        isOpened
    }
}

export function setBreadcrumbsUrl(breadCrumbsUrl) {
    return {
        type: 'SET_BREADCRUMBS',
        breadCrumbsUrl
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

export function toggleModal(modalOpen) {
    return {
        type: 'TOGGLE_MODAL',
        modalOpen
    }
}