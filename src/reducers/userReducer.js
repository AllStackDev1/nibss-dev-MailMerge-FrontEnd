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
        case userConstants.SEARCH_REQUEST:
            return {
                ...state,
                searchingUsers: true
            };
        case userConstants.SEARCH_SUCCESS:
            return {
                ...state,
                searchingUsers: false,
                searchResults: action.users
            };
        case userConstants.SEARCH_FAILURE:
            return {
                ...state,
                searchingUsers: false
            };
        case userConstants.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchingUsers: false,
                searchResults: null
            };
        case userConstants.INVITE_RESET:
            return {
                ...state,
                users: false
            };
        case userConstants.FETCH_REQUEST:
            return {
                ...state,
                fetchingUsers: true
            };
        case userConstants.FETCH_SUCCESS:
            return {
                ...state,
                fetchingUsers: false,
                platformUsers: action.users
            };
        case userConstants.FETCH_FAILURE:
            return {
                ...state,
                fetchingUsers: false
            };
        default:
            return state;
    }
}