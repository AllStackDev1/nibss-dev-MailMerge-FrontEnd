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
                [`${action.src === "document" ? 'documentRecipients' : 'recipients'}`]: action.recipients
            };
        case recipientConstants.FETCH_FAILURE:
            return {
                ...state,
                fetching: false
            };
        case recipientConstants.SEARCH_REQUEST:
            return {
                ...state,
                searching: true
            };
        case recipientConstants.SEARCH_SUCCESS:
            return {
                ...state,
                searching: false,
                [`${action.src === "document" ? 'documentSearchRecipients' : 'searchRecipients'}`]: action.recipients
            };
        case recipientConstants.SEARCH_FAILURE:
            return {
                ...state,
                searching: false
            };
        case recipientConstants.FETCH_PAGE_REQUEST:
            return {
                ...state,
                fetchingPage: true
            };
        case recipientConstants.FETCH_PAGE_SUCCESS:
            return {
                ...state,
                fetchingPage: false,
                [`${action.src === "document" ? 'documentRecipients' : 'recipients'}`]: action.src !== "document" ? action.recipients : { ...action.recipients, data: [...state.documentRecipients.data, ...action.recipients.data] }
            };
        case recipientConstants.FETCH_PAGE_FAILURE:
            return {
                ...state,
                fetchingPage: false
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
        case recipientConstants.EDIT_RECIPIENT_REQUEST:
            return {
                ...state,
                editingRecipient: true
            };
        case recipientConstants.EDIT_RECIPIENT_SUCCESS: {
            if (state.recipients) {
                if (state.recipients.data) {
                    state.recipients.data[state.recipients.data.findIndex(recipient => recipient._id === action.recipient.data._id)] = {
                        ...action.recipient.data
                    }
                }
            }

            if (state.searchRecipients) {
                if (state.searchRecipients.data) {
                    state.searchRecipients.data[state.searchRecipients.data.findIndex(recipient => recipient._id === action.recipient.data._id)] = {
                        ...action.recipient.data
                    }
                }
            }

            return {
                ...state,
                editingRecipient: false
            };
        }
        case recipientConstants.EDIT_RECIPIENT_FAILURE:
            return {
                ...state,
                editingRecipient: false
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
        case recipientConstants.DELETE_RECIPIENT_REQUEST:
            return {
                ...state,
                deleting: action.recipient
            };
        case recipientConstants.DELETE_RECIPIENT_SUCCESS:
            if (state.recipients) {
                if (state.recipients.data) {
                    state.recipients.data = [
                        ...state.recipients.data.filter((recipient) => recipient._id !== action.recipient.recipient._id)
                    ];
                }
            }

            return {
                ...state,
                deleting: false
            };
        case recipientConstants.DELETE_RECIPIENT_FAILURE:
            return {
                ...state,
                deleting: false
            };
        case recipientConstants.ADD_TAG_TO_RECIPIENT_REQUEST:
            return {
                ...state,
                addingTagToRecipient: true
            };
        case recipientConstants.ADD_TAG_TO_RECIPIENT_SUCCESS:
            if (state.recipients.data) {
                state.recipients.data[state.recipients.data.findIndex(recipient => recipient._id === action.recipient._id)] = {
                    ...action.recipient
                }
            }

            return {
                ...state,
                addingTagToRecipient: false
            };
        case recipientConstants.ADD_TAG_TO_RECIPIENT_FAILURE:
            return {
                ...state,
                addingTagToRecipient: false
            };
        default:
            return state;
    }
}