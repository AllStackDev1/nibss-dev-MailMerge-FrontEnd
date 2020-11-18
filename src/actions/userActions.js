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
                inviteUserResponse => {
                    dispatch(success(inviteUserResponse));

                    if (add) {
                        dispatch(push(`/dashboard/users`));
                    }

                    toast.success(inviteUserResponse.message);
                },
                error => {
                    if (error.message) {
                        toast.error(error.message);
                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() {
        return { type: userConstants.INVITE_REQUEST };
    }
    function success(userSuccess) {
        return { type: userConstants.INVITE_SUCCESS, users: userSuccess };
    }
    function failure(error) {
        return { type: userConstants.INVITE_FAILURE, error };
    }
}

function edit(user) {
    return dispatch => {
        dispatch(request());

        userService.edit(user)
            .then(
                editUserResponse => {
                    dispatch(success(editUserResponse));

                    toast.success(editUserResponse.message);
                },
                editError => {
                    if (editError.message) {
                        dispatch(failure(editError.message));
                    }
                }
            );
    };

    function request() {
        return { type: userConstants.EDIT_REQUEST };
    }
    function success(userSuccess) {
        return { type: userConstants.EDIT_SUCCESS, user: userSuccess };
    }
    function failure(error) {
        return { type: userConstants.EDIT_FAILURE, error };
    }
}

function deleteUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.deleteUser(user)
            .then(
                deleteUserResponse => {
                    dispatch(success(deleteUserResponse));

                    toast.success(deleteUserResponse.message);
                },
                deleteError => {
                    if (deleteError.message) {
                        dispatch(failure(deleteError.message));
                    }
                }
            );
    };

    function request(userRequest) {
        return { type: userConstants.DELETE_REQUEST, user: userRequest };
    }
    function success(userSuccess) {
        return { type: userConstants.DELETE_SUCCESS, user: userSuccess };
    }
    function failure(error) {
        return { type: userConstants.DELETE_FAILURE, error };
    }
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

                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Users - ${type.toUpperCase()}.${type}`;
                a.click();
            }).catch(function (error) {
                dispatch(failure());
            });
    };

    function request() {
        return { type: userConstants.DOWNLOAD_REQUEST };
    }
    function success() {
        return { type: userConstants.DOWNLOAD_SUCCESS };
    }
    function failure() {
        return { type: userConstants.DOWNLOAD_FAILURE };
    }
}

function updateRole(user) {
    return dispatch => {
        dispatch(request(user));

        userService.updateRole(user)
            .then(
                updateUserResponse => {
                    dispatch(success(updateUserResponse));

                    toast.success(updateUserResponse.message);
                },
                updateError => {
                    if (updateError.message) {
                        dispatch(failure(updateError.message));
                    }
                }
            );
    };

    function request(requestUser) {
        return { type: userConstants.ASSIGN_AS_ADMIN_REQUEST, user: requestUser };
    }
    function success(successUser) {
        return { type: userConstants.ASSIGN_AS_ADMIN_SUCCESS, user: successUser };
    }
    function failure(error) {
        return { type: userConstants.ASSIGN_AS_ADMIN_FAILURE, error };
    }
}

function fetchUsers() {
    return dispatch => {
        dispatch(request());

        userService.fetch()
            .then(
                fetchUserResponse => {
                    dispatch(success(fetchUserResponse));
                },
                fetchError => {
                    if (fetchError.message) {
                        dispatch(failure(fetchError.message));
                    }
                }
            );
    };

    function request() {
        return { type: userConstants.FETCH_REQUEST };
    }
    function success(userSuccess) {
        return { type: userConstants.FETCH_SUCCESS, users: userSuccess };
    }
    function failure(fetchError) {
        return { type: userConstants.FETCH_FAILURE, error: fetchError };
    }
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

    function request() {
        return { type: userConstants.FETCH_PAGE_REQUEST };
    }
    function success(users) {
        return { type: userConstants.FETCH_PAGE_SUCCESS, users };
    }
    function failure(error) {
        return { type: userConstants.FETCH_PAGE_FAILURE, error };
    }
}

function search(searchParam, filter) {
    return dispatch => {
        dispatch(request());

        userService.search(searchParam, filter)
            .then(
                userSearchResponse => {
                    dispatch(success(userSearchResponse));
                },
                searchError => {
                    if (searchError.message) {
                        dispatch(failure(searchError.message));
                    }
                }
            );
    };

    function request() {
        return { type: userConstants.SEARCH_REQUEST };
    }
    function success(users) {
        return { type: userConstants.SEARCH_SUCCESS, users };
    }
    function failure(error) {
        return { type: userConstants.SEARCH_FAILURE, error };
    }
}

function reset() {
    return { type: userConstants.INVITE_RESET };
}

function clearSearch() {
    return { type: userConstants.CLEAR_SEARCH_RESULTS };
}
