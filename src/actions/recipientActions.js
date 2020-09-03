import { recipientService } from '../services';
import { recipientConstants } from '../constants';
import { toast } from 'react-toastify';

export const recipientActions = {
    add,
    addTag,
    fetch,
    fetchTags
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

function fetch() {
    return dispatch => {
        dispatch(request());

        recipientService.fetch()
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

    function request() { return { type: recipientConstants.FETCH_REQUEST }; }
    function success(recipients) { return { type: recipientConstants.FETCH_SUCCESS, recipients }; }
    function failure(error) { return { type: recipientConstants.FETCH_FAILURE, error }; }
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