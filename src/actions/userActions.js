import { userConstants } from '../constants';
import { userService } from 'services';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

export const userActions = {
    login,
    logout
};

function login(user) {
    let data = {
        ...user,
        email: user.email_input
    }

    delete data.email_input;

    return dispatch => {
        dispatch(request());

        userService.login(data)
            .then(
                user => {
                    dispatch(success(user.user));

                    dispatch(push(`/dashboard/index`));
                },
                error => {
                    if (error.message) {
                        toast.error(error.message);

                        dispatch(failure(error.message));
                    }
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
    userService.logout();

    return { type: userConstants.LOGOUT };
}