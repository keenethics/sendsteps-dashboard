
export default function dashboardLayoutReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_DASHBOARD_DATA': {
            return {
                ...state,
                dashboardSites: action.data
            }
        }
        case 'SET_DASHBOARD_SETTINGS': {
            return {
                ...state,
                dashboardSettings: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}