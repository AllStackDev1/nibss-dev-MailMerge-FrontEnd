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
        case userConstants.DELETE_REQUEST:
            return {
                ...state,
                deleting: action.user
            };
        case userConstants.DELETE_SUCCESS:
            if (state.platformUsers) {
                if (state.platformUsers.data) {
                    state.platformUsers.data = [
                        ...state.platformUsers.data.filter((user) => user._id !== action.user.user._id)
                    ];
                }
            }

            return {
                ...state,
                deleting: false
            };
        case userConstants.DELETE_FAILURE:
            return {
                ...state,
                deleting: false
            };
        case userConstants.EDIT_REQUEST:
            return {
                ...state,
                editing: true
            };
        case userConstants.EDIT_SUCCESS:
            if (state.platformUsers) {
                if (state.platformUsers.data) {
                    state.platformUsers.data[state.platformUsers.data.findIndex(user => user._id === action.user.user._id)] = {
                        ...action.user.user
                    }
                }
            }

            if (state.searchResults) {
                if (state.searchResults.data) {
                    state.searchResults.data[state.searchResults.data.findIndex(user => user._id === action.user.user._id)] = {
                        ...action.user.user
                    }
                }
            }

            return {
                ...state,
                editing: false
            };
        case userConstants.EDIT_FAILURE:
            return {
                ...state,
                editing: false
            };
        case userConstants.ASSIGN_AS_ADMIN_REQUEST:
            return {
                ...state,
                updatingRole: action.user
            };
        case userConstants.ASSIGN_AS_ADMIN_SUCCESS:
            if (state.platformUsers) {
                if (state.platformUsers.data) {
                    state.platformUsers.data[state.platformUsers.data.findIndex(user => user._id === action.user.user._id)] = {
                        ...action.user.user
                    }
                }
            }

            if (state.searchResults) {
                if (state.searchResults.data) {
                    state.searchResults.data[state.searchResults.data.findIndex(user => user._id === action.user.user._id)] = {
                        ...action.user.user
                    }
                }
            }

            return {
                ...state,
                updatingRole: false
            };
        case userConstants.ASSIGN_AS_ADMIN_FAILURE:
            return {
                ...state,
                updatingRole: false
            };
        case userConstants.SEARCH_REQUEST:
            return {
                ...state,
                searching: true
            };
        case userConstants.SEARCH_SUCCESS:
            return {
                ...state,
                searching: false,
                searchResults: action.users
            };
        case userConstants.SEARCH_FAILURE:
            return {
                ...state,
                searching: false,
                searchResults: {
                    data: []
                }
            };
        case userConstants.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searching: false,
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
        case userConstants.FETCH_PAGE_REQUEST:
            return {
                ...state,
                fetchingUsersPage: true
            };
        case userConstants.FETCH_PAGE_SUCCESS:
            return {
                ...state,
                fetchingUsersPage: false,
                platformUsers: action.users
            };
        case userConstants.FETCH_PAGE_FAILURE:
            return {
                ...state,
                fetchingUsersPage: false
            };
        default:
            return state;
    }
}