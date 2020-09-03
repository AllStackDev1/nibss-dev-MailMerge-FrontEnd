import Config from '../config/config';
import { authService } from './authService';

export const recipientService = {
    add,
    addTag,
    addTagsToRecipient,
    fetch,
    fetchTags
};

function add(recipient, multiple) {
    if (multiple) {
        recipient = {
            data: recipient
        }
    }
    
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(recipient)
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/recipient${multiple ? '/multiple' : ""}`, requestOptions)
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

function addTagsToRecipient(recipient, tags) {
    tags = {
        tag: tags
    };

    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(tags)
    };

    return authService.fetchFrom(`${Config.API_URL}/admin/recipient/${recipient}`, requestOptions)
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
