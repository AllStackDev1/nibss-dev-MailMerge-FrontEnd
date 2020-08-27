import decode from 'jwt-decode';
import Config from '../config/config';

export const userService = {
    login,
    logout,
    loggedIn,
    fetchFrom,
    getProfile,
    getToken
};

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${Config.API_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            user.account = decode(user._token);

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(`nibss-user`, JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(`nibss-user`);
}

function fetchFrom(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-key': `Bearer ${Config.API_KEY}`
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (loggedIn()) {
        headers.Authorization = 'Bearer ' + getToken();
        // headers.Apptoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLb2JvMzYwIiwiaWF0IjoxNTUwODQyOTY2LCJleHAiOjE2NDU1MzczNjYsImF1ZCI6Ind3dy5rb2JvMzYwLmNvbSIsInN1YiI6Ik1vYmlsZSBBcHAgVG9rZW4iLCJHaXZlbk5hbWUiOiJUb2JpIiwiU3VybmFtZSI6IkFtdXNhbiIsIkVtYWlsIjoidG9iaUBrb2JvMzYwLmNvbSIsIlJvbGUiOiJTb2Z0d2FyZSBFbmdpbmVlciJ9.2O8MBTn9Z3tgsZ2_Oqa1cHUlk_hgp8VG8qcYpCzY1AY';
    }

    return fetch(url, {
        headers,
        ...options
    })
        .then(res => handleResponse(res))
        .then(response => {
            return response;
        });
}

function getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(getToken());
}

function loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = getToken(); // Getting token from localstorage

    return !!token && !isTokenExpired(token); // handwaiving here
}

function getToken() {
    // Retrieves the user token from localStorage
    let user = JSON.parse(localStorage.getItem(`nibss-user`));

    return user ? user._token : user;
}

function isTokenExpired(token) {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        let data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            data.status = response.status;

            const error = (data && data) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}