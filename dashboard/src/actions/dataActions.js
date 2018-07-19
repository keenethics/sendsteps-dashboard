export function selectPhonenumber(selectedPhonenumber) {
    return {
        type: 'SELECT_PHONENUMBER',
        selectedPhonenumber
    }
}

export function setPhonenumbers(countryPhonenumbers) {
    return {
        type: 'SET_PHONENUMBERS',
        countryPhonenumbers
    }
}