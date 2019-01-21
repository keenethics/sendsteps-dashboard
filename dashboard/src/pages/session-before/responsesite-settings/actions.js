export function setResponseSiteSettings(data) {
    return {
        type: 'SET_RESPONSE_SETTINGS_DATA',
        data
    }
}

export function setResponsePhonenumbers(numbers) {
    return  {
        type: 'SET_RESPONSE_PHONENUMBERS',
        numbers
    }
}
