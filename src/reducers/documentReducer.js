import { documentConstants } from '../constants';

const initialState = {
    fetching: false,
    fetchingSingle: false,
    fetchingPage: false
};

export default function document(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
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
                fetching: false,
                documents: {}
            };
        case documentConstants.SIGN_DOCUMENT_REQUEST:
            return {
                ...state,
                signingDocument: true
            };
        case documentConstants.SIGN_DOCUMENT_SUCCESS:
            return {
                ...state,
                signingDocument: false,
                document: action.document
            };
        case documentConstants.SIGN_DOCUMENT_FAILURE:
            return {
                ...state,
                signingDocument: false
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
                fetchingPage: false,
                documents: {}
            };
        case documentConstants.PREPARE_DOCUMENT_START:
            return {
                ...state,
                preparing: true,
                document: {}
            };
        case documentConstants.PREPARE_DOCUMENT_SUCCESS:
            return {
                ...state,
                preparing: false,
                document: action.response
            };
        case documentConstants.PREPARE_DOCUMENT_ERROR:
            return {
                ...state,
                preparing: false,
                document: {}
            };
        case documentConstants.FETCH_SINGLE_REQUEST:
            return {
                ...state,
                fetchingSingle: true
            };
        case documentConstants.FETCH_SINGLE_SUCCESS:
            return {
                ...state,
                fetchingSingle: false,
                document: action.document
            };
        case documentConstants.FETCH_SINGLE_FAILURE:
            return {
                ...state,
                fetchingSingle: false
            };
        default:
            return state;
    }
}
