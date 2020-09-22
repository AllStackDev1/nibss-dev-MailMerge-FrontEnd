import { recipientService } from '../services';
import { recipientConstants } from '../constants';
import { toast } from 'react-toastify';

export const recipientActions = {
    add,
    edit,
    addTag,
    fetch,
    fetchPage,
    fetchTags,
    addTagsToRecipient,
    search,
    deleteRecipient
};

function add(recipients, multiple) {
    return dispatch => {
        dispatch(request());

        recipientService.add(recipients, multiple)
            .then(
                recipient => {
                    recipientService.fetch()
                        .then(
                            recipients => {
                                dispatch(success(recipients));

                                toast.success(recipient.message);
                            });
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: recipientConstants.ADD_RECIPIENT_REQUEST }; }
    function success(recipients) { return { type: recipientConstants.ADD_RECIPIENT_SUCCESS, recipients }; }
    function failure(error) { return { type: recipientConstants.ADD_RECIPIENT_FAILURE, error }; }
}

function deleteRecipient(recipient) {
    return dispatch => {
        dispatch(request(recipient));

        recipientService.deleteRecipient(recipient)
            .then(
                recipient => {
                    dispatch(success(recipient));

                    toast.success(recipient.message);
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request(recipient) { return { type: recipientConstants.DELETE_RECIPIENT_REQUEST, recipient }; }
    function success(recipient) { return { type: recipientConstants.DELETE_RECIPIENT_SUCCESS, recipient }; }
    function failure(error) { return { type: recipientConstants.DELETE_RECIPIENT_FAILURE, error }; }
}

function edit(recipient) {
    return dispatch => {
        dispatch(request());

        recipientService.edit(recipient)
            .then(
                recipient => {
                    dispatch(success(recipient));

                    toast.success(recipient.message);
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: recipientConstants.EDIT_RECIPIENT_REQUEST }; }
    function success(recipient) { return { type: recipientConstants.EDIT_RECIPIENT_SUCCESS, recipient }; }
    function failure(error) { return { type: recipientConstants.EDIT_RECIPIENT_FAILURE, error }; }
}

function addTag(tag) {
    return dispatch => {
        dispatch(request());

        recipientService.addTag(tag)
            .then(
                tag => {
                    recipientService.fetchTags()
                        .then(
                            tags => {
                                dispatch(success(tags));

                                toast.success(tag.message);
                            });
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: recipientConstants.ADD_TAG_REQUEST }; }
    function success(tags) { return { type: recipientConstants.ADD_TAG_SUCCESS, tags }; }
    function failure(error) { return { type: recipientConstants.ADD_TAG_FAILURE, error }; }
}

function addTagsToRecipient(recipient, tags) {
    return dispatch => {
        dispatch(request());

        recipientService.addTagsToRecipient(recipient, tags)
            .then(
                recipient => {
                    dispatch(success(recipient.data));

                    toast.success(recipient.message);
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: recipientConstants.ADD_TAG_TO_RECIPIENT_REQUEST }; }
    function success(recipient) { return { type: recipientConstants.ADD_TAG_TO_RECIPIENT_SUCCESS, recipient }; }
    function failure(error) { return { type: recipientConstants.ADD_TAG_TO_RECIPIENT_FAILURE, error }; }
}

function fetch(src) {
    return dispatch => {
        dispatch(request());

        recipientService.fetch(src)
            .then(
                recipients => {
                    dispatch(success(recipients, src));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: recipientConstants.FETCH_REQUEST }; }
    function success(recipients, src) { return { type: recipientConstants.FETCH_SUCCESS, recipients, src }; }
    function failure(error) { return { type: recipientConstants.FETCH_FAILURE, error }; }
}

function search(searchTerm, filter, src) {
    return dispatch => {
        dispatch(request());

        recipientService.search(searchTerm, filter)
            .then(
                recipients => {
                    dispatch(success(recipients));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: recipientConstants.SEARCH_REQUEST }; }
    function success(recipients, src) { return { type: recipientConstants.SEARCH_SUCCESS, recipients, src }; }
    function failure(error) { return { type: recipientConstants.SEARCH_FAILURE, error }; }
}

function fetchPage(page, src) {
    return dispatch => {
        dispatch(request());

        recipientService.fetchPage(page)
            .then(
                recipients => {
                    dispatch(success(recipients, src));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: recipientConstants.FETCH_PAGE_REQUEST }; }
    function success(recipients, src) { return { type: recipientConstants.FETCH_PAGE_SUCCESS, recipients, src }; }
    function failure(error) { return { type: recipientConstants.FETCH_PAGE_FAILURE, error }; }
}

function fetchTags() {
    return dispatch => {
        dispatch(request());

        recipientService.fetchTags()
            .then(
                tags => {
                    dispatch(success(tags));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: recipientConstants.FETCH_TAGS_REQUEST }; }
    function success(tags) { return { type: recipientConstants.FETCH_TAGS_SUCCESS, tags }; }
    function failure(error) { return { type: recipientConstants.FETCH_TAGS_FAILURE, error }; }
}