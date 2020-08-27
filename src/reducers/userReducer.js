import { userConstants } from '../constants';

const initialState = {
    invitingUsers: false
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.INVITE_REQUEST:
            return {
                ...state,
                invitingUsers: true,
                users: false
            };
        case userConstants.INVITE_SUCCESS:
            return {
                ...state,
                invitingUsers: false,
                users: action.users
            };
        case userConstants.INVITE_FAILURE:
            return {
                ...state,
                invitingUsers: false
            };
        case userConstants.INVITE_RESET:
            return {
                ...state,
                users: false
            };
        default:
            return state;
    }
}