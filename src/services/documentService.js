import { authService } from './authService';

export const documentService = {
    fetch,
    fetchSingle,
    fetchPage,
    signDocument
};

function fetch(type) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/documents${`${type ? '?' : ''}${type === "signed" ? "signed=true" : type === "pending" ? "signed=false" : type === "rejected" ? "rejected=true" : ""}`}`, requestOptions)
        .then(authService.handleResponse)
        .then(documents => {
            return documents;
        });
}

function fetchSingle(id, userToken) {
    const requestOptions = {
        method: 'GET'
    };

    if (userToken) {
        requestOptions.headers = {
            'Authorization': 'Bearer ' + userToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/documents/${id}`, requestOptions)
        .then(authService.handleResponse)
        .then(documents => {
            return documents;
        });
}

function fetchPage(type, page) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/documents?page=${page}${`${type ? '&' : ''}${type === "signed" ? "signed=true" : type === "pending" ? "signed=false" : type === "rejected" ? "rejected=true" : ""}`}`, requestOptions)
        .then(authService.handleResponse)
        .then(documents => {
            return documents;
        });
}

function signDocument(data, userToken) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data)
    };

    if (userToken) {
        requestOptions.headers = {
            'Authorization': 'Bearer ' + userToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/documents/sign`, requestOptions)
        .then(authService.handleResponse)
        .then(document => {
            return document;
        });
}