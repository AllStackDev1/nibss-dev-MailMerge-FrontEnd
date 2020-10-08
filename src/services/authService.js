import decode from 'jwt-decode';

export const authService = {
    login,
    logout,
    loggedIn,
    fetchFrom,
    getProfile,
    getToken,
    fetchProfile,
    updateProfile,
    deleteSignature
};

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, requestOptions)
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
        'Content-Type': 'application/json'
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

function fetchProfile() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    let url = `${process.env.REACT_APP_API_URL}/users`;

    return fetchFrom(url, requestOptions)
        .then(this.handleResponse)
        .then(user => {
            let userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

            userLocal.data = user.user;

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(`nibss-user`, JSON.stringify(userLocal));

            return user;
        });
}

function updateProfile(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(user)
    };

    let url = `${process.env.REACT_APP_API_URL}/users`;

    return fetchFrom(url, requestOptions)
        .then(this.handleResponse)
        .then(user => {
            let userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

            userLocal.data = user.user;

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(`nibss-user`, JSON.stringify(userLocal));

            return user;
        });
}

function deleteSignature(signature) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({
            signature
        })
    };

    let url = `${process.env.REACT_APP_API_URL}/users/remove/signature`;

    return fetchFrom(url, requestOptions)
        .then(this.handleResponse)
        .then(user => {
            let userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

            userLocal.data = user.user;

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(`nibss-user`, JSON.stringify(userLocal));

            return user;
        });
}