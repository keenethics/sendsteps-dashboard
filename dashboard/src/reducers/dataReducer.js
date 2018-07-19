export default function dataReducer(state, action) {

    switch(action.type) {
        case 'SET_PHONENUMBERS': {
            return {
                ...state,
                countryPhonenumbers: action.countryPhonenumbers
            }
        }
        case 'SELECT_PHONENUMBER': {
            return {
                ...state,
                selectedPhonenumber: action.selectedPhonenumber
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}