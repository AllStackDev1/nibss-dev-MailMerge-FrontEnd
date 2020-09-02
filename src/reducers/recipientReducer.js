import { recipientConstants } from '../constants';

const initialState = {
    fetching: false,
    fetchingTags: false
};

export default function recipient(state = initialState, action) {
    switch (action.type) {
        case recipientConstants.FETCH_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case recipientConstants.FETCH_SUCCESS:
            return {
                ...state,
                fetching: false,
                recipients: action.recipients
            };
        case recipientConstants.FETCH_FAILURE:
            return {
                ...state,
                fetching: false
            };
        case recipientConstants.FETCH_TAGS_REQUEST:
            return {
                ...state,
                fetchingTags: true
            };
        case recipientConstants.FETCH_TAGS_SUCCESS:
            return {
                ...state,
                fetchingTags: false,
                tags: action.tags
            };
        case recipientConstants.FETCH_TAGS_FAILURE:
            return {
                ...state,
                fetchingTags: false
            };
        
        
        
        case recipientConstants.ADD_RECIPIENT_REQUEST:
            return {
                ...state,
                addingRecipient: true
            };
        case recipientConstants.ADD_RECIPIENT_SUCCESS:
            return {
                ...state,
                addingRecipient: false,
                recipients: action.recipients
            };
        case recipientConstants.ADD_RECIPIENT_FAILURE:
            return {
                ...state,
                addingRecipient: false
            };
        case recipientConstants.ADD_TAG_REQUEST:
            return {
                ...state,
                addingTag: true
            };
        case recipientConstants.ADD_TAG_SUCCESS:
            return {
                ...state,
                addingTag: false,
                tags: action.tags
            };
        case recipientConstants.ADD_TAG_FAILURE:
            return {
                ...state,
                addingTag: false
            };
        default:
            return state;
    }
}