export default function appReducer(state, action) {

    switch(action.type) {
        case 'TOGGLE_MENU': {
            console.log('Toggling menu', state);
            return {
                ...state,
                menuOpened: action.isOpened
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