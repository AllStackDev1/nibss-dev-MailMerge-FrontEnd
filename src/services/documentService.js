import { authService } from './authService';

export const documentService = {
    fetch,
    fetchSingle,
    fetchPage,
    signDocument
};

const requestFormat = 'application/json';

function fetch(type) {
    const requestOptions = {
        method: 'GET'
    };

    const filter = `${type ? '?' : ''}${type === "signed" ? "signed=true" : type === "pending" ? "signed=false" : type === "rejected" ? "rejected=true" : ""}`;

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/documents${`${filter}`}`, requestOptions)
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
            'Accept': requestFormat,
            'Content-Type': requestFormat
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

    const filter = `${type ? '&' : ''}${type === "signed" ? "signed=true" : type === "pending" ? "signed=false" : type === "rejected" ? "rejected=true" : ""}`;

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/documents?page=${page}${filter}`, requestOptions)
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
            'Accept': requestFormat,
            'Content-Type': requestFormat
        }
    }

    return authService.fetchFrom(`${process.env.REACT_APP_API_URL}/documents/sign`, requestOptions)
        .then(authService.handleResponse)
        .then(document => {
            return document;
        });
}
