import Config from '../config/config';
import { authService } from './authService';

export const documentService = {
    fetch,
    fetchPage
};

function fetch() {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/documents`, requestOptions)
        .then(authService.handleResponse)
        .then(documents => {
            return documents;
        });
}

function fetchPage(page) {
    const requestOptions = {
        method: 'GET'
    };

    return authService.fetchFrom(`${Config.API_URL}/documents?page=${page}`, requestOptions)
        .then(authService.handleResponse)
        .then(documents => {
            return documents;
        });
}