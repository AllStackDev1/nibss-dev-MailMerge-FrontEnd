import { authConstants } from '../constants';

const initialState = {
    loggingIn: false,
    uploading: false
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loggingIn: false,
                user: action.user
            };
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false
            };
        case authConstants.UPLOAD_START:
            return {
                ...state,
                uploading: true
            };
        case authConstants.UPLOAD_PROGRESS:
            return {
                ...state,
                uploading: true,
                uploadProgress: action.loaded
            };
        case authConstants.UPLOAD_SUCCESS:
            return {
                ...state,
                uploading: false,
                uploaded: 1
            };
        case authConstants.UPLOAD_ERROR:
            return {
                ...state,
                uploading: false,
                uploadProgress: 0
            };
        default:
            return state;
    }
}