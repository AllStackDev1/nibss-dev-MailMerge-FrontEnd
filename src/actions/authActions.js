import { authConstants } from '../constants';
import { authService } from 'services';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import Axios from 'axios';

export const authActions = {
    login,
    logout,
    saveSignature,
    deleteSignature,
    reset,
    fetchProfile,
    updateProfile,
};

// Handle user login
function login(user) {
    const data = {
        ...user,
        email: user.email_input
    }

    delete data.email_input;

    return dispatch => {
        dispatch(request());

        authService.login(data)
            .then(
                response => {
                    dispatch(success(response));


                    if (response.data.role === "user" && response.data.status === "active") {
                        dispatch(push(`/dashboard/documents`));
                    } else if (response.data.role === "user") {
                        dispatch(push(`/onboarding`));
                    } else {
                        if (response.data.userCount > 1 && response.data.status === "active") {
                            dispatch(push(`/dashboard`));
                        } else {
                            dispatch(push(`/onboarding`));
                        }
                    }
                },
                loginError => {
                    if (loginError.message) {
                        toast.error(loginError.message);

                        dispatch(failure(loginError.message));
                    }
                }
            );
    };

    function request() {
        return { type: authConstants.LOGIN_REQUEST };
    }
    function success(userSuccess) {
        return { type: authConstants.LOGIN_SUCCESS, user: userSuccess };
    }
    function failure(error) {
        return { type: authConstants.LOGIN_FAILURE, error };
    }
}

// Handle user log out
function logout() {
    authService.logout();

    return { type: authConstants.LOGOUT };
}

function reset() {
    return { type: authConstants.RESET_UPLOAD };
}

// Save signature action
function saveSignature(file, add) {
    return dispatch => {
        dispatch(startUpload());

        const data = new FormData();
        data.append('media', file);

        const uploadendpoint = add ? `${process.env.REACT_APP_API_URL}/users/add/signature` : `${process.env.REACT_APP_API_URL}/users/invite/complete`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authService.getToken()
        }

        return Axios
            .post(uploadendpoint, data, {
                onUploadProgress: ProgressEvent => {
                    const loaded = (ProgressEvent.loaded / ProgressEvent.total * 100);
                    dispatch(update(loaded));
                },
                headers
            })
            .then(async res => {
                toast.success(res.data.message);

                if (add) {
                    dispatch(push(`/dashboard/user-profile`));
                }

                await authService.updateAccount(res.data);

                dispatch(success(res, add));
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
        return { type: authConstants.UPLOAD_START };
    }
    function update(loaded) {
        return { type: authConstants.UPLOAD_PROGRESS, loaded };
    }
    function success(response, addSuccess) {
        return { type: authConstants.UPLOAD_SUCCESS, response, add: addSuccess };
    }
    function error() {
        return { type: authConstants.UPLOAD_ERROR };
    }
}

// Delete user saved signature
function deleteSignature(signature) {
    return dispatch => {
        dispatch(request(signature));

        authService.deleteSignature(signature)
            .then(
                profile => {
                    toast.success(profile.message);
                    dispatch(success(profile.user));
                },
                deleteError => {
                    if (deleteError.message) {
                        toast.error(deleteError.message);

                        dispatch(failure(deleteError.message));
                    }
                }
            );
    };

    function request(requestSignature) {
        return { type: authConstants.START_DELETE_SIGNATURE, signature: requestSignature };
    }
    function success(profile) {
        return { type: authConstants.DELETE_SIGNATURE_SUCCESS, profile };
    }
    function failure(error) {
        return { type: authConstants.DELETE_SIGNATURE_FAILURE, error };
    }
}

// Get user profile from server
function fetchProfile() {
    return dispatch => {
        dispatch(request());

        authService.fetchProfile()
            .then(
                profile => {
                    dispatch(success(profile.user));
                },
                fetchError => {
                    if (fetchError.message) {
                        toast.error(fetchError.message);

                        dispatch(failure(fetchError.message));
                    }
                }
            );
    };

    function request() {
        return { type: authConstants.START_FETCH_PROFILE };
    }
    function success(profile) {
        return { type: authConstants.FETCH_PROFILE_SUCCESS, profile };
    }
    function failure(error) {
        return { type: authConstants.FETCH_PROFILE_FAILURE, error };
    }
}

// Update user profile
function updateProfile(user) {
    return dispatch => {
        dispatch(request());

        authService.updateProfile(user)
            .then(
                profile => {
                    toast.success(profile.message);
                    dispatch(success(profile.user));
                },
                updateError => {
                    if (updateError.message) {
                        toast.error(updateError.message);

                        dispatch(failure(updateError.message));
                    }
                }
            );
    };

    function request() {
        return { type: authConstants.START_UPDATE_PROFILE };
    }
    function success(profile) {
        return { type: authConstants.UPDATE_PROFILE_SUCCESS, profile };
    }
    function failure(error) {
        return { type: authConstants.UPDATE_PROFILE_FAILURE, error };
    }
}
