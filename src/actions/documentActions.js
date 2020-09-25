import { documentConstants } from '../constants';
import { authService, documentService } from 'services';
import { toast } from 'react-toastify';
import Config from 'config/config';
import Axios from 'axios';

export const documentActions = {
    fetch,
    fetchPage,
    prepare
};

function fetch(type) {
    return dispatch => {
        dispatch(request());

        documentService.fetch(type)
            .then(
                documents => {
                    dispatch(success(documents,));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: documentConstants.FETCH_REQUEST }; }
    function success(documents) { return { type: documentConstants.FETCH_SUCCESS, documents }; }
    function failure(error) { return { type: documentConstants.FETCH_FAILURE, error }; }
}

function fetchPage(type, page) {
    return dispatch => {
        dispatch(request());

        documentService.fetchPage(type, page)
            .then(
                documents => {
                    dispatch(success(documents));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: documentConstants.FETCH_PAGE_REQUEST }; }
    function success(documents) { return { type: documentConstants.FETCH_PAGE_SUCCESS, documents }; }
    function failure(error) { return { type: documentConstants.FETCH_PAGE_FAILURE, error }; }
}

function prepare(document) {
    return dispatch => {
        dispatch(startUpload());

        const data = new FormData();
        data.append('media', document.file);
        data.append('documentTitle', document.file.name);
        data.append('documentBody', document.documentBody);
        data.append('recipients', JSON.stringify(document.recipients));
        data.append('signatories', JSON.stringify(document.signatories));

        let uploadendpoint = `${Config.API_URL}/documents/prepare`;
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authService.getToken()
        }

        Axios
            .post(uploadendpoint, data, {
                onUploadProgress: ProgressEvent => {
                    let loaded = (ProgressEvent.loaded / ProgressEvent.total * 100);
                    dispatch(update(loaded));
                },
                headers
            })
            .then(res => {
                console.log(res);
                toast.success(res.data.message);

                dispatch(success(res));
            })
            .catch(err => {
                dispatch(error());

                if (err.response) {
                    if (err.response.data) {
                        toast.error(err.response.data.message);
                    }
                }
            });

    };

    function startUpload() { return { type: documentConstants.PREPARE_DOCUMENT_START }; }
    function update(loaded) { return { type: documentConstants.PREPARE_DOCUMENT_PROGRESS, loaded }; }
    function success(response) { return { type: documentConstants.PREPARE_DOCUMENT_SUCCESS, response }; }
    function error() { return { type: documentConstants.PREPARE_DOCUMENT_ERROR }; }
}
