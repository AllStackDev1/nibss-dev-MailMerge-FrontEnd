import { authConstants } from '../constants';

const initialState = {
    loggingIn: false,
    uploading: false,
    updatingProfile: false
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
        case authConstants.START_UPDATE_PROFILE:
            return {
                ...state,
                updatingProfile: true
            };
        case authConstants.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updatingProfile: false,
                user: action.user
            };
        case authConstants.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                updatingProfile: false
            };
        case authConstants.UPLOAD_START:
            return {
                ...state,
                uploading: true,
                uploaded: 0
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
        case authConstants.RESET_UPLOAD:
            return {
                ...state,
                uploading: false,
                uploaded: 0
            };
        default:
            return state;
    }
}