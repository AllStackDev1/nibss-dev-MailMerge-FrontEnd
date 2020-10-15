import { documentConstants } from '../constants';
import { authService, documentService } from 'services';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { push } from 'connected-react-router';

export const documentActions = {
    fetch,
    fetchSingle,
    fetchPage,
    prepare,
    setDocument,
    signDocument,
    signDocumentNew
};

function fetch(type) {
    return dispatch => {
        dispatch(request());

        documentService.fetch(type)
            .then(
                documents => {
                    dispatch(success(documents));
                },
<<<<<<< HEAD
                fetchError => {
                    if (fetchError.message) {
                        dispatch(failure(fetchError.message));
=======
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
                    }
                }
            );
    };

<<<<<<< HEAD
    function request() {
        return { type: documentConstants.FETCH_REQUEST };
    }
    function success(documents) {
        return { type: documentConstants.FETCH_SUCCESS, documents };
    }
    function failure(error) {
        return { type: documentConstants.FETCH_FAILURE, error };
    }
=======
    function request() { return { type: documentConstants.FETCH_REQUEST }; }
    function success(documents) { return { type: documentConstants.FETCH_SUCCESS, documents }; }
    function failure(error) { return { type: documentConstants.FETCH_FAILURE, error }; }
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
}

function fetchSingle(id, userToken) {
    return dispatch => {
        dispatch(request());

        documentService.fetchSingle(id, userToken)
            .then(
                document => {
                    dispatch(success(document));
                },
<<<<<<< HEAD
                fetchSingleError => {
                    if (fetchSingleError.message) {
                        dispatch(failure(fetchSingleError.message));
=======
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
                    }
                }
            );
    };

<<<<<<< HEAD
    function request() {
        return { type: documentConstants.FETCH_SINGLE_REQUEST };
    }
    function success(document) {
        return { type: documentConstants.FETCH_SINGLE_SUCCESS, document };
    }
    function failure(error) {
        return { type: documentConstants.FETCH_SINGLE_FAILURE, error };
    }
=======
    function request() { return { type: documentConstants.FETCH_SINGLE_REQUEST }; }
    function success(document) { return { type: documentConstants.FETCH_SINGLE_SUCCESS, document }; }
    function failure(error) { return { type: documentConstants.FETCH_SINGLE_FAILURE, error }; }
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
}

function fetchPage(type, page) {
    return dispatch => {
        dispatch(request());

        documentService.fetchPage(type, page)
            .then(
                documents => {
                    dispatch(success(documents));
                },
<<<<<<< HEAD
                fetchPageError => {
                    if (fetchPageError.message) {
                        dispatch(failure(fetchPageError.message));
=======
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
                    }
                }
            );
    };

<<<<<<< HEAD
    function request() {
        return { type: documentConstants.FETCH_PAGE_REQUEST };
    }
    function success(documents) {
        return { type: documentConstants.FETCH_PAGE_SUCCESS, documents };
    }
    function failure(error) {
        return { type: documentConstants.FETCH_PAGE_FAILURE, error };
    }
=======
    function request() { return { type: documentConstants.FETCH_PAGE_REQUEST }; }
    function success(documents) { return { type: documentConstants.FETCH_PAGE_SUCCESS, documents }; }
    function failure(error) { return { type: documentConstants.FETCH_PAGE_FAILURE, error }; }
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
}

function signDocument(data, userToken) {
    return dispatch => {
        dispatch(request());

        documentService.signDocument(data, userToken)
            .then(
                document => {
                    dispatch(success(document.document));

                    toast.success(document.message);
                    dispatch(push(`/dashboard/documents`));
                },
<<<<<<< HEAD
                signError => {
                    if (signError.message) {
                        toast.error(signError.message);
                        dispatch(failure(signError.message));
=======
                error => {
                    if (error.message) {
                        toast.error(error.message);
                        dispatch(failure(error.message));
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
                    }
                }
            );
    };

<<<<<<< HEAD
    function request() {
        return { type: documentConstants.SIGN_DOCUMENT_REQUEST };
    }
    function success(document) {
        return { type: documentConstants.SIGN_DOCUMENT_SUCCESS, document };
    }
    function failure(error) {
        return { type: documentConstants.SIGN_DOCUMENT_FAILURE, error };
    }
=======
    function request() { return { type: documentConstants.SIGN_DOCUMENT_REQUEST }; }
    function success(document) { return { type: documentConstants.SIGN_DOCUMENT_SUCCESS, document }; }
    function failure(error) { return { type: documentConstants.SIGN_DOCUMENT_FAILURE, error }; }
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
}

function signDocumentNew(file, documentId, userToken) {
    return dispatch => {
        dispatch(request());

        const data = new FormData();
        data.append('media', file);
        data.append('documentId', documentId);

<<<<<<< HEAD
        const uploadendpoint = `${process.env.REACT_APP_API_URL}/documents/sign`;
        const headers = {
=======
        let uploadendpoint = `${process.env.REACT_APP_API_URL}/documents/sign`;
        let headers = {
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken ? userToken : authService.getToken()}`
        }

        Axios
            .post(uploadendpoint, data, {
                onUploadProgress: ProgressEvent => {
<<<<<<< HEAD
                    const loaded = (ProgressEvent.loaded / ProgressEvent.total * 100);
=======
                    let loaded = (ProgressEvent.loaded / ProgressEvent.total * 100);
>>>>>>> 9359060986d4298b8bb0c95d7fa0a1ab133c4c70
                    console.log(loaded);
                },
                headers
            })
            .then(res => {
                toast.success(res.data.message);

                console.log(res);

                dispatch(success(res.data.data));
                dispatch(push(`/dashboard/documents`));
            })
            .catch(err => {
                dispatch(failure());

                console.log(err);

                if (err.response) {
                    if (err.response.data) {
                        toast.error(err.response.data.message);
                    }
                }
            });

    };

    function request() {
        return { type: documentConstants.SIGN_DOCUMENT_REQUEST };
    }
    function success(document) {
        return { type: documentConstants.SIGN_DOCUMENT_SUCCESS, document };
    }
    function failure(error) {
        return { type: documentConstants.SIGN_DOCUMENT_FAILURE, error };
    }
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

        const uploadendpoint = `${process.env.REACT_APP_API_URL}/documents/prepare`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authService.getToken()
        }

        Axios
            .post(uploadendpoint, data, {
                onUploadProgress: ProgressEvent => {
                    const loaded = (ProgressEvent.loaded / ProgressEvent.total * 100);
                    dispatch(update(loaded));
                },
                headers
            })
            .then(res => {
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

    function startUpload() {
        return { type: documentConstants.PREPARE_DOCUMENT_START };
    }
    function update(loaded) {
        return { type: documentConstants.PREPARE_DOCUMENT_PROGRESS, loaded };
    }
    function success(response) {
        return { type: documentConstants.PREPARE_DOCUMENT_SUCCESS, response };
    }
    function error() {
        return { type: documentConstants.PREPARE_DOCUMENT_ERROR };
    }
}

function setDocument(document) {
    return { type: documentConstants.FETCH_SINGLE_SUCCESS, document: { document } };
}
