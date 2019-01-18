
export default function responseSettingsReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_RESPONSE_SETTINGS_DATA': {
            return {
                ...state,
                settings: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}