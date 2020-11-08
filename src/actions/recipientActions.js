import { recipientService } from '../services';
import { recipientConstants } from '../constants';
import { toast } from 'react-toastify';

export const recipientActions = {
    add,
    edit,
    addTag,
    deleteTag,
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
                addRecipientResponse => {
                    recipientService.fetch()
                        .then(
                            recipients => {
                                dispatch(success(recipients));

                                toast.success(addRecipientResponse.message);
                            });
                },
                addRecipientError => {
                    if (addRecipientError.message) {
                        toast.error(addRecipientError.message);
                        dispatch(failure(addRecipientError.message));
                    }
                }
            );
    };

    function request() {
        return { type: recipientConstants.ADD_RECIPIENT_REQUEST };
    }
    function success(recipientSuccess) {
        return { type: recipientConstants.ADD_RECIPIENT_SUCCESS, recipients: recipientSuccess };
    }
    function failure(recipientError) {
        return { type: recipientConstants.ADD_RECIPIENT_FAILURE, error: recipientError };
    }
}

function deleteRecipient(recipient) {
    return dispatch => {
        dispatch(request(recipient));

        recipientService.deleteRecipient(recipient)
            .then(
                deleteRecipientResponse => {
                    dispatch(success(deleteRecipientResponse));

                    toast.success(deleteRecipientResponse.message);
                },
                deleteRecipientError => {
                    if (deleteRecipientError.message) {
                        dispatch(failure(deleteRecipientError.message));
                    }
                }
            );
    };

    function request(deleteRecipientRequest) {
        return { type: recipientConstants.DELETE_RECIPIENT_REQUEST, recipient: deleteRecipientRequest };
    }
    function success(deleteRecipientSuccess) {
        return { type: recipientConstants.DELETE_RECIPIENT_SUCCESS, recipient: deleteRecipientSuccess };
    }
    function failure(deleteRecipientError) {
        return { type: recipientConstants.DELETE_RECIPIENT_FAILURE, error: deleteRecipientError };
    }
}

function deleteTag(tag) {
    return dispatch => {
        dispatch(request(tag));

        recipientService.deleteTag(tag)
            .then(
                deleteTagResponse => {
                    dispatch(success(deleteTagResponse.tag));

                    toast.success(deleteTagResponse.message);
                },
                deleteTagError => {
                    if (deleteTagError.message) {
                        dispatch(failure(deleteTagError.message));
                    }
                }
            );
    };

    function request(deleteTagRequest) {
        return { type: recipientConstants.DELETE_TAG_REQUEST, tag: deleteTagRequest };
    }
    function success(deleteTagSuccess) {
        return { type: recipientConstants.DELETE_TAG_SUCCESS, tag: deleteTagSuccess };
    }
    function failure(deleteTagError) {
        return { type: recipientConstants.DELETE_TAG_FAILURE, error: deleteTagError };
    }
}

function edit(recipient) {
    return dispatch => {
        dispatch(request());

        recipientService.edit(recipient)
            .then(
                editRecipientResponse => {
                    dispatch(success(editRecipientResponse));

                    toast.success(editRecipientResponse.message);
                },
                editRecipientError => {
                    if (editRecipientError.message) {
                        dispatch(failure(editRecipientError.message));
                    }
                }
            );
    };

    function request() {
        return { type: recipientConstants.EDIT_RECIPIENT_REQUEST };
    }
    function success(editRecipientSuccess) {
        return { type: recipientConstants.EDIT_RECIPIENT_SUCCESS, recipient: editRecipientSuccess };
    }
    function failure(editRecipientError) {
        return { type: recipientConstants.EDIT_RECIPIENT_FAILURE, error: editRecipientError };
    }
}

function addTag(tag) {
    return dispatch => {
        dispatch(request());

        recipientService.addTag(tag)
            .then(
                addTagResponse => {
                    recipientService.fetchTags()
                        .then(
                            fetchtags => {
                                dispatch(success(fetchtags));

                                toast.success(addTagResponse.message);
                            });
                },
                addTagError => {
                    if (addTagError.message) {
                        dispatch(failure(addTagError.message));
                    }
                }
            );
    };

    function request() {
        return { type: recipientConstants.ADD_TAG_REQUEST };
    }
    function success(addTagSuccess) {
        return { type: recipientConstants.ADD_TAG_SUCCESS, tags: addTagSuccess };
    }
    function failure(addTagError) {
        return { type: recipientConstants.ADD_TAG_FAILURE, error: addTagError };
    }
}

function addTagsToRecipient(recipient, tags) {
    return dispatch => {
        dispatch(request());

        recipientService.addTagsToRecipient(recipient, tags)
            .then(
                addToRecipientSuccess => {
                    dispatch(success(addToRecipientSuccess.data));

                    toast.success(addToRecipientSuccess.message);
                },
                addToRecipientError => {
                    if (addToRecipientError.message) {
                        dispatch(failure(addToRecipientError.message));
                    }
                }
            );
    };

    function request() {
        return { type: recipientConstants.ADD_TAG_TO_RECIPIENT_REQUEST };
    }
    function success(addToRecipientS) {
        return { type: recipientConstants.ADD_TAG_TO_RECIPIENT_SUCCESS, recipient: addToRecipientS };
    }
    function failure(addToRecipientE) {
        return { type: recipientConstants.ADD_TAG_TO_RECIPIENT_FAILURE, error: addToRecipientE };
    }
}

function fetch(src) {
    return dispatch => {
        dispatch(request());

        recipientService.fetch(src)
            .then(
                fetchResponse => {
                    dispatch(success(fetchResponse, src));
                },
                fetchError => {
                    if (fetchError.message) {
                        dispatch(failure(fetchError.message));
                    }
                }
            );
    };

    function request() {
        return { type: recipientConstants.FETCH_REQUEST };
    }
    function success(recipientSuccess, srcSuccess) {
        return { type: recipientConstants.FETCH_SUCCESS, recipients: recipientSuccess, src: srcSuccess };
    }
    function failure(requestError) {
        return { type: recipientConstants.FETCH_FAILURE, error: requestError };
    }
}

function search(searchTerm, filter, src) {
    return dispatch => {
        dispatch(request());

        recipientService.search(searchTerm, filter)
            .then(
                searchResponse => {
                    dispatch(success(searchResponse));
                },
                searchError => {
                    if (searchError.message) {
                        dispatch(failure(searchError.message));
                    }
                }
            );
    };

    function request() {
        return { type: recipientConstants.SEARCH_REQUEST };
    }
    function success(recipientSuccess) {
        return { type: recipientConstants.SEARCH_SUCCESS, recipients: recipientSuccess, src };
    }
    function failure(recipientError) {
        return { type: recipientConstants.SEARCH_FAILURE, error: recipientError };
    }
}

function fetchPage(page, src) {
    return dispatch => {
        dispatch(request());

        recipientService.fetchPage(page)
            .then(
                pageResponse => {
                    dispatch(success(pageResponse, src));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() {
        return { type: recipientConstants.FETCH_PAGE_REQUEST };
    }
    function success(pageSuccess, srcFetchSuccess) {
        return { type: recipientConstants.FETCH_PAGE_SUCCESS, recipients: pageSuccess, src: srcFetchSuccess };
    }
    function failure(pageError) {
        return { type: recipientConstants.FETCH_PAGE_FAILURE, error: pageError };
    }
}

function fetchTags() {
    return dispatch => {
        dispatch(request());

        recipientService.fetchTags()
            .then(
                fetchTagsResponse => {
                    dispatch(success(fetchTagsResponse));
                },
                fetchTagsError => {
                    if (fetchTagsError.message) {
                        dispatch(failure(fetchTagsError.message));
                    }
                }
            );
    };

    function request() {
        return { type: recipientConstants.FETCH_TAGS_REQUEST };
    }
    function success(tagSuccess) {
        return { type: recipientConstants.FETCH_TAGS_SUCCESS, tags: tagSuccess };
    }
    function failure(fetchError) {
        return { type: recipientConstants.FETCH_TAGS_FAILURE, error: fetchError };
    }
}
