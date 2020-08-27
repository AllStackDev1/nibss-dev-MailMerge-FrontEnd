import { authConstants } from '../constants';
import { authService } from 'services';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import Config from 'config/config';
import Axios from 'axios';

export const authActions = {
    login,
    logout,
    saveSignature
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
                        dispatch(push(`/dashboard/index`));
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

function saveSignature(file) {

    return dispatch => {
        dispatch(startUpload());

        const data = new FormData();
        data.append('media', file);

        let uploadendpoint = `${Config.API_URL}/users/invite/complete`;
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
                toast.success(res.message);

                console.log(res);

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

    function startUpload() { return { type: authConstants.UPLOAD_START }; }
    function update(loaded) { return { type: authConstants.UPLOAD_PROGRESS, loaded }; }
    function success(response) { return { type: authConstants.UPLOAD_SUCCESS, response }; }
    function error() { return { type: authConstants.UPLOAD_ERROR }; }
}