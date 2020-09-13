import { documentConstants } from '../constants';

const initialState = {
    fetching: false,
    fetchingPage: false
};

export default function document(state = initialState, action) {
    switch (action.type) {
        case documentConstants.FETCH_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case documentConstants.FETCH_SUCCESS:
            return {
                ...state,
                fetching: false,
                documents: action.documents
            };
        case documentConstants.FETCH_FAILURE:
            return {
                ...state,
                fetching: false
            };
        case documentConstants.FETCH_PAGE_REQUEST:
            return {
                ...state,
                fetchingPage: true
            };
        case documentConstants.FETCH_PAGE_SUCCESS:
            return {
                ...state,
                fetchingPage: false,
                documents: action.documents
            };
        case documentConstants.FETCH_PAGE_FAILURE:
            return {
                ...state,
                fetchingPage: false
            };
        default:
            return state;
    }
}