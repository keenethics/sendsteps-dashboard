export function setResponseSiteSettings(data) {
    return {
        type: 'SET_RESPONSE_SETTINGS_DATA',
        data
    }
}

export function setSelectablePhonenumbers(selectablePhonenumbers) {
    return {
        type: 'SET_SELECTABLE_PHONENUMBERS',
        selectablePhonenumbers
    }
}