import { authService } from './authService';
import { buildQuery } from 'helpers/buildQuery';

export const userService = {
    invite,
    fetch,
    fetchPage,
    search,
    edit,
    deleteUser,
    updateRole
};

function invite(users) {
    let data = [...users];

    data.map(user => {
        if (!user.administrator) {
            user.role = "user"
        } else {
            user.role = "administrator"
        }

        // delete user.administrator;

        return user;
    });

    let obj = {
        data: data
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(obj)
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/invite`, requestOptions)
        .then(authService.handleResponse)
        .then(users => {
            return users;
        });
}

function edit(user) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(user)
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users/${user._id}`, requestOptions)
        .then(authService.handleResponse)
        .then(user => {
            return user;
        });
}

function deleteUser(user) {
    const requestOptions = {
        method: 'DELETE'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users/${user._id}`, requestOptions)
        .then(authService.handleResponse)
        .then(user => {
            return user;
        });
}

function updateRole(user) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
            role: user.role === "administrator" ? "user" : "administrator"
        })
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users/role/${user._id}`, requestOptions)
        .then(authService.handleResponse)
        .then(user => {
            return user;
        });
}

function fetch() {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users`, requestOptions)
        .then(authService.handleResponse)
        .then(users => {
            return users;
        });
}

function fetchPage(page) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users?page=${page}`, requestOptions)
        .then(authService.handleResponse)
        .then(users => {
            return users;
        });
}

function search(search, filter) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users/search?${buildQuery({ search, filter })}`, requestOptions)
        .then(authService.handleResponse)
        .then(users => {
            return users;
        });
}
