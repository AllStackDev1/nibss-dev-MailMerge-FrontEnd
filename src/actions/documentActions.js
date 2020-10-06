import { documentConstants } from '../constants';
import { authService, documentService } from 'services';
import { toast } from 'react-toastify';
import Config from 'config/config';
import Axios from 'axios';
import { push } from 'connected-react-router';

export const documentActions = {
    fetch,
    fetchSingle,
    fetchPage,
    prepare,
    setDocument,
    signDocument
};

function fetch(type) {
    return dispatch => {
        dispatch(request());

        documentService.fetch(type)
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

    function request() { return { type: documentConstants.FETCH_REQUEST }; }
    function success(documents) { return { type: documentConstants.FETCH_SUCCESS, documents }; }
    function failure(error) { return { type: documentConstants.FETCH_FAILURE, error }; }
}

function fetchSingle(id, userToken) {
    return dispatch => {
        dispatch(request());

        documentService.fetchSingle(id, userToken)
            .then(
                document => {
                    dispatch(success(document));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: documentConstants.FETCH_SINGLE_REQUEST }; }
    function success(document) { return { type: documentConstants.FETCH_SINGLE_SUCCESS, document }; }
    function failure(error) { return { type: documentConstants.FETCH_SINGLE_FAILURE, error }; }
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

function signDocument(data) {
    return dispatch => {
        dispatch(request());

        documentService.signDocument(data)
            .then(
                document => {
                    dispatch(success(document.document));

                    toast.success(document.message);
                    dispatch(push(`/dashboard/documents`));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: documentConstants.SIGN_DOCUMENT_REQUEST }; }
    function success(document) { return { type: documentConstants.SIGN_DOCUMENT_SUCCESS, document }; }
    function failure(error) { return { type: documentConstants.SIGN_DOCUMENT_FAILURE, error }; }
}

function prepare(document, signatories) {
    return dispatch => {
        dispatch(startUpload());

        const data = new FormData();
        data.append('media', document.file);
        data.append('documentTitle', document.file.name);
        data.append('documentBody', document.documentBody);
        data.append('recipients', JSON.stringify(document.recipients));
        data.append('signatories', JSON.stringify(signatories));

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

function setDocument(document) {
    return { type: documentConstants.FETCH_SINGLE_SUCCESS, document: { document } };
}