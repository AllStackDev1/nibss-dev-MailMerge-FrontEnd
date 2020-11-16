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
    const data = [...users];

    data.forEach(user => {
        if (!user.administrator) {
            user.role = "user"
        } else {
            user.role = "administrator"
        }
    });

    const obj = {
        data: data
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(obj)
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/invite`, requestOptions)
        .then(authService.handleResponse)
        .then(inviteUsers => {
            return inviteUsers;
        });
}

function edit(user) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(user)
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users/${user._id}`, requestOptions)
        .then(authService.handleResponse)
        .then(editUser => {
            return editUser;
        });
}

function deleteUser(user) {
    const requestOptions = {
        method: 'DELETE'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users/${user._id}`, requestOptions)
        .then(authService.handleResponse)
        .then(deletedUser => {
            return deletedUser;
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
        .then(updateUser => {
            return updateUser;
        });
}

function fetch() {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users`, requestOptions)
        .then(authService.handleResponse)
        .then(fetchUsers => {
            return fetchUsers;
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

function search(searchParam, filter) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/users/search?${buildQuery({ search: searchParam, filter })}`, requestOptions)
        .then(authService.handleResponse)
        .then(searchUsers => {
            return searchUsers;
        });
}
