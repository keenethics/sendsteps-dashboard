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
        default: {
            return {
                ...state
            }
        }
    }
}