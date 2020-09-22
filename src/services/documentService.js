import Config from '../config/config';
import { authService } from './authService';

export const documentService = {
    fetch,
    fetchPage
};

function fetch(type) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/documents${`${type ? '?' : ''}${type === "signed" ? "signed=true" : type === "pending" ? "signed=false" : type === "rejected" ? "rejected=true" : ""}`}`, requestOptions)
        .then(authService.handleResponse)
        .then(documents => {
            return documents;
        });
}

function fetchPage(type, page) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/documents?page=${page}${`${type ? '&' : ''}${type === "signed" ? "signed=true" : type === "pending" ? "signed=false" : type === "rejected" ? "rejected=true" : ""}`}`, requestOptions)
        .then(authService.handleResponse)
        .then(documents => {
            return documents;
        });
}