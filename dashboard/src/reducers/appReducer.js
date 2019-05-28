export default function appReducer(state, action) {

    switch(action.type) {
        case 'TOGGLE_MENU': {
            return {
                ...state,
                menuOpened: action.isOpened
            }
        }
        case 'SET_APP_SIZE': {
            return {
                ...state,
                appSize: action.appSize
            }
        }
        case 'SET_BREADCRUMBS': {
            return {
                ...state,
                breadCrumbsUrl: action.breadCrumbsUrl
            }
        }
        case 'SET_VIEW': {
            return {
                ...state,
                currentView: action.currentView
            }
        }
        case 'TOGGLE_MODAL': {
            return {
                ...state,
                modalOpen: action.modalOpen
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}