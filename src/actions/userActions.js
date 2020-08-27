import { userService } from '../services';
import { userConstants } from '../constants';
import { toast } from 'react-toastify';

export const userActions = {
    invite,
    reset
};

function invite(users) {
    return dispatch => {
        dispatch(request());

        userService.invite(users)
            .then(
                users => {
                    dispatch(success(users));

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

function reset() {
    return { type: userConstants.INVITE_RESET };
}