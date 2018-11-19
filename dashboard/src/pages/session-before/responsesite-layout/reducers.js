
export default function siteLayoutReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_RESPONSE_DATA': {
            return {
                ...state,
                responseSites: action.data
            }
        }
        case 'SET_LAYOUT_DATA': {
            return {
                ...state,
                responseSettings: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}