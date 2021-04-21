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
    updateAccount,
    deleteSignature,
    handleResponse,
    isTokenExpired
};

const requestFormat = 'application/json';

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': requestFormat },
        body: JSON.stringify(user)
    };

    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(loginUser => {
            loginUser.account = decode(loginUser._token);

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(`nibss-user`, JSON.stringify(loginUser));

            return loginUser;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(`nibss-user`);
}

function fetchFrom(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
        'Accept': requestFormat,
        'Content-Type': requestFormat
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (loggedIn()) {
        headers.Authorization = 'Bearer ' + getToken();
    }

    return fetch(url, {
        headers,
        ...options
    })
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
    const user = JSON.parse(localStorage.getItem(`nibss-user`));

    return user ? user._token : user;
}

function isTokenExpired(token) {
    try {
        const decoded = decode(token);

        return (decoded.exp < Date.now() / 1000); // Checking if token is expired. N
    }
    catch (err) {
        return false;
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            data.status = response.status;

            const error = data || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function fetchProfile() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': requestFormat,
            'Authorization': 'Bearer ' + getToken()
        }
    };

    const url = `${process.env.REACT_APP_API_URL}/users`;

    return fetchFrom(url, requestOptions)
        .then(this.handleResponse)
        .then(user => {
            const userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

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
            'Content-Type': requestFormat,
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(user)
    };

    const url = `${process.env.REACT_APP_API_URL}/users`;

    return fetchFrom(url, requestOptions)
        .then(this.handleResponse)
        .then(updateUser => {
            const userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

            userLocal.data = updateUser.user;

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(`nibss-user`, JSON.stringify(userLocal));

            return updateUser;
        });
}

function updateAccount(user) {
    return new Promise((resolve, reject) => {
        user.account = decode(user._token);

        localStorage.setItem(`nibss-user`, JSON.stringify(user));

        resolve(user);
    })
}

function deleteSignature(signature) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': requestFormat,
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({
            signature
        })
    };

    const url = `${process.env.REACT_APP_API_URL}/users/remove/signature`;

    return fetchFrom(url, requestOptions)
        .then(this.handleResponse)
        .then(deleteUser => {
            const userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

            userLocal.data = deleteUser.user;

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(`nibss-user`, JSON.stringify(userLocal));

            return deleteUser;
        });
}
