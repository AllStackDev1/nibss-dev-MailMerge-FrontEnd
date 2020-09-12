import { userService } from '../services';
import { userConstants } from '../constants';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';

export const userActions = {
    invite,
    fetch,
    reset,
    search,
    clearSearch
};

function invite(users, add) {
    return dispatch => {
        dispatch(request());

        userService.invite(users)
            .then(
                users => {
                    dispatch(success(users));

                    if (add) {
                        dispatch(push(`/dashboard/users`));
                    }

                    toast.success(users.message);
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: userConstants.INVITE_REQUEST }; }
    function success(users) { return { type: userConstants.INVITE_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.INVITE_FAILURE, error }; }
}

function fetch() {
    return dispatch => {
        dispatch(request());

        userService.fetch()
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: userConstants.FETCH_REQUEST }; }
    function success(users) { return { type: userConstants.FETCH_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.FETCH_FAILURE, error }; }
}

function search(param) {
    return dispatch => {
        dispatch(request());

        userService.search(param)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: userConstants.SEARCH_REQUEST }; }
    function success(users) { return { type: userConstants.SEARCH_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.SEARCH_FAILURE, error }; }
}

function reset() {
    return { type: userConstants.INVITE_RESET };
}

function clearSearch() {
    return { type: userConstants.CLEAR_SEARCH_RESULTS };
}