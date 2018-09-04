export function cookiesAccessible() {
    return navigator.cookieEnabled;
}

export function addCookieValues(key, value, hrsToExpire) {
    if(cookiesAccessible()) {
        let currentDate = new Date();
        currentDate.setTime(currentDate.getTime() + (hrsToExpire*60*60*1000));
        let expiredDate = "expires="+ currentDate.toUTCString();
        document.cookie = key + '=' + value + ';' + expiredDate + ';path=/';
        // console.log('Added cookie: "' + key + '=' + value + '", expires in ' + hrsToExpire + ' hours');
        return true;
    }
    return false;
}

export function getCookieValues(key) {

    let currentCookie = false;

    if(cookiesAccessible()) {
        let cookieName = key + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieList = decodedCookie.split(';');
        cookieList.forEach(cookie => {
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) !== -1) {
                console.log('Found cookie: ' + key);
                currentCookie = cookie.substring(cookieName.length, cookie.length);
            }
        })
    }
    return currentCookie;
}

export function removeCookieValues(key) {
    if(cookiesAccessible()) {
        try {
            document.cookie = key+'=; Max-Age=-99999999;';
            // console.log('Removing cookie: ' + key);
            return true;
        } catch (error) {
        }
    }
    console.log('Unable to remove cookie: ' + key);
    return false;
}
