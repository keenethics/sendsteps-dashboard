import fetch from "cross-fetch";
import "whatwg-fetch";
import {
  addToLocalStorage,
  removeFromLocalStorage
} from "../scripts/localStorage";
import { addCookieValues, removeCookieValues } from "../scripts/cookieStorage";
import { toast } from "react-toastify";

// const LOGIN_URL = process.env.LOGIN_URL;
const LOGIN_URL = "/api/login";
const LOGIN_CHECK_AUTH_URL = "/api/login/check_auth";

export function setAuthorized(isAuthorized) {
  return {
    type: "SET_AUTHORIZED",
    isAuthorized
  };
}

export function setUser(currentUser) {
  return {
    type: "SET_USER",
    currentUser
  };
}

export function authRequired(isAuthRequired) {
  return {
    type: "AUTH_REQUIRED",
    isAuthRequired
  };
}

export function authLoading(authLoading) {
  return {
    type: "AUTH_LOADING",
    authLoading
  };
}

export function checkAuthorized(token = "") {
  return dispatch => {
    const data = { jwt: token };

    dispatch(authRequired(true));
    fetch(LOGIN_CHECK_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        if (result) {
          dispatch(setAuthorized(true));
          dispatch(setUser(result));
        }
      })
      .catch(error => {
        dispatch(setAuthorized(false));
        dispatch(authRequired(false));
      });
  };
}

export function securityError(securityError) {
  return {
    type: "SECURITY_ERROR",
    securityError
  };
}

export function setGeneralError(generalError) {
  return {
    type: "GENERAL_ERROR",
    generalError
  };
}

export function signOut() {
  return dispatch => {
    removeFromLocalStorage("token");
    removeCookieValues("SSTToken");
    dispatch(setAuthorized(false));
    dispatch(authRequired(null));
  };
}

export function register(
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  termsAccepted,
  onSuccess,
  onFail
) {
  const registerParams = JSON.stringify({
    email: encodeURIComponent(email),
    password: encodeURIComponent(password),
    passwordConfirm: encodeURIComponent(passwordConfirm),
    options: {
      firstName: encodeURIComponent(firstName),
      lastName: encodeURIComponent(lastName),
      termsAccepted: encodeURIComponent(termsAccepted)
    }
  });

  fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: "function=register&params=" + registerParams
  })
    .then(result => result.json())
    .then(
      result => {
        // console.log(result)
        if (result.error) {
          console.log(result.error);
        }
      },
      error => {
        console.log(error);
      }
    );
}

export function authenticate(email, password, onSuccess, onFail) {
  const data = { email, password };

  fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(result => result.json())
    .then(result => {
      if (result && result.jwt) {
        if (!addToLocalStorage("token", result.jwt)) {
          if (!addCookieValues("SSTToken", result.jwt, 48)) {
            toast(
              "Unable to save user key to LocalStorage/Cookies, please enable these settings in your browser before logging in."
            );
          }
        }
        onSuccess(result);
      } else {
        onFail(result);
      }
    })
    .catch(error => onFail(error));

  /*
  const params = JSON.stringify({
    email: encodeURIComponent(email),
    password: encodeURIComponent(password)
  });
  // console.log(params);
  fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: "function=login&params=" + params
  })
  .then(result => result.json())
    .then(
      result => {
        if (result && result.authorized) {
          if (!addToLocalStorage("token", result.token)) {
            if (!addCookieValues("SSTToken", result.token, 48)) {
              toast(
                "Unable to save user key to LocalStorage/Cookies, please enable these settings in your browser before logging in."
                );
              }
          }
          onSuccess(result);
        } else {
          onFail(result);
        }
      },
      error => onFail(error)
      );
  */
}
