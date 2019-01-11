
export default function responseSettingsReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_RESPONSE_SETTINGS_DATA': {
            return {
                ...state,
                settings: action.data
            }
        }
        case 'SET_SELECTABLE_PHONENUMBERS': {
            return {
                ...state,
                selectablePhonenumbers: action.selectablePhonenumbers
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}