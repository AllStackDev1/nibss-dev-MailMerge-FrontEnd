import Config from '../config/config';
import { authService } from './authService';

export const recipientService = {
    add,
    addTag,
    fetch,
    fetchTags
};

function add(recipient) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(recipient)
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/recipient`, requestOptions)
        .then(authService.handleResponse)
        .then(recipient => {
            return recipient;
        });
}

function addTag(tag) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(tag)
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/recipient/tag`, requestOptions)
        .then(authService.handleResponse)
        .then(tag => {
            return tag;
        });
}

function fetch() {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/recipient`, requestOptions)
        .then(authService.handleResponse)
        .then(recipients => {
            return recipients.data;
        });
}

function fetchTags() {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/recipient/tag`, requestOptions)
        .then(authService.handleResponse)
        .then(tags => {
            return tags.data;
        });
}
