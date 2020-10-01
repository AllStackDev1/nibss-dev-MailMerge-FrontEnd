import { authConstants } from '../constants';
import { authService } from 'services';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import Config from 'config/config';
import Axios from 'axios';

export const authActions = {
    login,
    logout,
    saveSignature,
    deleteSignature,
    reset,
    fetchProfile,
    updateProfile
};

function login(user) {
    let data = {
        ...user,
        email: user.email_input
    }

    delete data.email_input;

    return dispatch => {
        dispatch(request());

        authService.login(data)
            .then(
                user => {
                    dispatch(success(user));

                    if ((user.data.role === "user" && user.data.status === "active")) {
                        dispatch(push(`/dashboard/documents`));
                    } else {
                        dispatch(push(`/onboarding`));
                    }
                },
                error => {
                    if (error.message) {
                        toast.error(error.message);

                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: authConstants.LOGIN_REQUEST }; }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error }; }
}

function logout() {
    authService.logout();

    return { type: authConstants.LOGOUT };
}

function reset() {
    return { type: authConstants.RESET_UPLOAD };
}

function saveSignature(file, add) {
    return dispatch => {
        dispatch(startUpload());

        const data = new FormData();
        data.append('media', file);

        let uploadendpoint = add ? `${Config.API_URL}/users/add/signature` : `${Config.API_URL}/users/invite/complete`;
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
                toast.success(res.data.message);

                if(add) {
                    dispatch(push(`/dashboard/user-profile`));
                }

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

    function startUpload() { return { type: authConstants.UPLOAD_START }; }
    function update(loaded) { return { type: authConstants.UPLOAD_PROGRESS, loaded }; }
    function success(response, add) { return { type: authConstants.UPLOAD_SUCCESS, response, add }; }
    function error() { return { type: authConstants.UPLOAD_ERROR }; }
}

function deleteSignature(signature) {
    return dispatch => {
        dispatch(request(signature));

        authService.deleteSignature(signature)
            .then(
                profile => {
                    toast.success(profile.message);
                    dispatch(success(profile.user));
                },
                error => {
                    if (error.message) {
                        toast.error(error.message);

                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request(signature) { return { type: authConstants.START_DELETE_SIGNATURE, signature }; }
    function success(profile) { return { type: authConstants.DELETE_SIGNATURE_SUCCESS, profile }; }
    function failure(error) { return { type: authConstants.DELETE_SIGNATURE_FAILURE, error }; }
}

function fetchProfile() {
    return dispatch => {
        dispatch(request());

        authService.fetchProfile()
            .then(
                profile => {
                    dispatch(success(profile.user));
                },
                error => {
                    if (error.message) {
                        toast.error(error.message);

                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: authConstants.START_FETCH_PROFILE }; }
    function success(profile) { return { type: authConstants.FETCH_PROFILE_SUCCESS, profile }; }
    function failure(error) { return { type: authConstants.FETCH_PROFILE_FAILURE, error }; }
}

function updateProfile(user) {
    return dispatch => {
        dispatch(request());

        authService.updateProfile(user)
            .then(
                profile => {
                    toast.success(profile.message);
                    dispatch(success(profile.user));
                },
                error => {
                    if (error.message) {
                        toast.error(error.message);

                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: authConstants.START_UPDATE_PROFILE }; }
    function success(profile) { return { type: authConstants.UPDATE_PROFILE_SUCCESS, profile }; }
    function failure(error) { return { type: authConstants.UPDATE_PROFILE_FAILURE, error }; }
}