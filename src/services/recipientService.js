import { authService } from './authService';
import { buildQuery } from 'helpers/buildQuery';

export const recipientService = {
    add,
    edit,
    deleteRecipient,
    deleteTag,
    addTag,
    addTagsToRecipient,
    fetch,
    search,
    fetchPage,
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

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient${multiple ? '/multiple' : ""}`, requestOptions)
        .then(authService.handleResponse)
        .then(addRecipient => {
            return addRecipient;
        });
}

function edit(recipient) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(recipient)
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient/${recipient._id}`, requestOptions)
        .then(authService.handleResponse)
        .then(editRecipient => {
            return editRecipient;
        });
}

function addTag(tag) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(tag)
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient/tag`, requestOptions)
        .then(authService.handleResponse)
        .then(addTagResponse => {
            return addTagResponse;
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

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient/${recipient}`, requestOptions)
        .then(authService.handleResponse)
        .then(tag => {
            return tag;
        });
}

function fetch() {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient`, requestOptions)
        .then(authService.handleResponse)
        .then(recipients => {
            return recipients;
        });
}

function search(searchParam, filter) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient/search?${buildQuery({
        search: searchParam,
        filter: filter?.length > 0 ? JSON.stringify(filter) : ''
    })}`, requestOptions)
        .then(authService.handleResponse)
        .then(recipients => {
            return recipients;
        });
}

function deleteRecipient(recipient) {
    const requestOptions = {
        method: 'DELETE'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient/${recipient._id}`, requestOptions)
        .then(authService.handleResponse)
        .then(deleteRecipientResponse => {
            return deleteRecipientResponse;
        });
}

function deleteTag(tag) {
    const requestOptions = {
        method: 'DELETE'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient/tag/${tag._id}`, requestOptions)
        .then(authService.handleResponse)
        .then(deleteTagResponse => {
            return deleteTagResponse;
        });
}

function fetchPage(page) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient?page=${page}`, requestOptions)
        .then(authService.handleResponse)
        .then(recipients => {
            return recipients;
        });
}

function fetchTags() {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/admin/recipient/tag`, requestOptions)
        .then(authService.handleResponse)
        .then(tags => {
            return tags.data;
        });
}
