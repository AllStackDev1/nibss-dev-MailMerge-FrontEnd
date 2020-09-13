import Config from '../config/config';
import { authService } from './authService';

export const userService = {
    invite,
    fetch,
    fetchPage,
    search
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

    return authService.fetchFrom(`${Config.API_URL}/admin/invite`, requestOptions)
        .then(authService.handleResponse)
        .then(users => {
            return users;
        });
}

function fetch() {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/users`, requestOptions)
        .then(authService.handleResponse)
        .then(users => {
            return users;
        });
}

function fetchPage(page) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/users?page=${page}`, requestOptions)
        .then(authService.handleResponse)
        .then(users => {
            return users;
        });
}

function search(param) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/users/search?search=${param}`, requestOptions)
        .then(authService.handleResponse)
        .then(users => {
            return users.data;
        });
}
