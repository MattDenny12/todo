/**
 * Retrieves a cookie with the given name.
 * @param {String} cookieName The name of the cookie to retrieve.
 * @returns The contents of the cookie if it exists, null otherwise.
 */
 export const getCookie = (cookieName) => {
    cookieName = cookieName + '=';

    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieList = decodedCookie.split(';');

    for (let i = 0; i < cookieList.length; i++) {
        let cookie = cookieList[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }

    return null;
}

/**
 * Sets the provided cookie with the provided value.
 * @param {String} cookieName The name of the cookie to set.
 * @param {String} cookieValue That value of the cookie.
 */
export const setCookie = (cookieName, cookieValue) => {
    document.cookie = `${cookieName}=${cookieValue}`;
}