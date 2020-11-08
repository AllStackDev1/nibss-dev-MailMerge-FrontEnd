import { authService, userService } from '../services';
import { userConstants } from '../constants';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';

export const userActions = {
    invite,
    fetchUsers,
    fetchPage,
    reset,
    search,
    clearSearch,
    edit,
    deleteUser,
    updateRole,
    exportDocument
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
                        toast.error(error.message);
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: userConstants.INVITE_REQUEST }; }
    function success(users) { return { type: userConstants.INVITE_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.INVITE_FAILURE, error }; }
}

function edit(user) {
    return dispatch => {
        dispatch(request());

        userService.edit(user)
            .then(
                user => {
                    dispatch(success(user));

                    toast.success(user.message);
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: userConstants.EDIT_REQUEST }; }
    function success(user) { return { type: userConstants.EDIT_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.EDIT_FAILURE, error }; }
}

function deleteUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.deleteUser(user)
            .then(
                user => {
                    dispatch(success(user));

                    toast.success(user.message);
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request(user) { return { type: userConstants.DELETE_REQUEST, user }; }
    function success(user) { return { type: userConstants.DELETE_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error }; }
}

function exportDocument(type) {
    return dispatch => {
        dispatch(request());

        fetch(`${process.env.REACT_APP_API_URL}/admin/users/download/${type}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${authService.getToken()}` }
            })
            .then(response => response.blob())
            .then(response => {
                dispatch(success());

                let url = window.URL.createObjectURL(response);
                let a = document.createElement('a');
                a.href = url;
                a.download = `Users - ${type.toUpperCase()}.${type}`;
                a.click();
            }).catch(function(error) {
                dispatch(failure());
                console.log(error);
            });
    };

    function request() { return { type: userConstants.DOWNLOAD_REQUEST }; }
    function success() { return { type: userConstants.DOWNLOAD_SUCCESS }; }
    function failure() { return { type: userConstants.DOWNLOAD_FAILURE }; }
}

function updateRole(user) {
    return dispatch => {
        dispatch(request(user));

        userService.updateRole(user)
            .then(
                user => {
                    dispatch(success(user));

                    toast.success(user.message);
                },
                error => {
                    if (error.message) {
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request(user) { return { type: userConstants.ASSIGN_AS_ADMIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.ASSIGN_AS_ADMIN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.ASSIGN_AS_ADMIN_FAILURE, error }; }
}

function fetchUsers() {
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

function fetchPage(page) {
    return dispatch => {
        dispatch(request());

        userService.fetchPage(page)
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

    function request() { return { type: userConstants.FETCH_PAGE_REQUEST }; }
    function success(users) { return { type: userConstants.FETCH_PAGE_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.FETCH_PAGE_FAILURE, error }; }
}

function search(search, filter) {
    return dispatch => {
        dispatch(request());

        userService.search(search, filter)
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
