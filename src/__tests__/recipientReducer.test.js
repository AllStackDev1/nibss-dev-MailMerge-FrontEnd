import { recipientConstants } from "../constants"
import recipient from "../reducers/recipientReducer"



describe("recipient reducer", () => {

    test("empty state", () => {
        expect(recipient(undefined)).toEqual({
            fetching: false,
            fetchingTags: false
        })
    })

    test("fetch request", () => {
        expect(recipient({}, { type: recipientConstants.FETCH_REQUEST })).toEqual({
            fetching: true
        })
    })

    test("fetch success", () => {
        expect(recipient({}, { type: recipientConstants.FETCH_SUCCESS, src: "document", recipients: "recipient" })).toEqual({
            fetching: false,
            documentRecipients: "recipient"
        })
    })

    test("fetch failure", () => {
        expect(recipient({}, { type: recipientConstants.FETCH_FAILURE, })).toEqual({
            fetching: false,
        })
    })

    test("search request", () => {
        expect(recipient({}, { type: recipientConstants.SEARCH_REQUEST, })).toEqual({
            searching: true
        })
    })

    test("search success", () => {
        expect(recipient({}, { type: recipientConstants.SEARCH_SUCCESS, src: "document", recipients: "recipient" })).toEqual({
            searching: false,
            documentSearchRecipients: "recipient"
        })
    })

    test("search failure", () => {
        expect(recipient({}, { type: recipientConstants.SEARCH_FAILURE, })).toEqual({
            searching: false,
        })
    })

    test("fetch page request", () => {
        expect(recipient({}, { type: recipientConstants.FETCH_PAGE_REQUEST, })).toEqual({
            fetchingPage: true
        })
    })

    test("fetch page request", () => {
        expect(recipient({ documentRecipients: { data: "data" } }, { type: recipientConstants.FETCH_PAGE_SUCCESS, src: "document", recipients: { data: "data" } })).toEqual({
            fetchingPage: false,
            documentRecipients: { data: ["d", "a", "t", "a", "d", "a", "t", "a"] }
        })
    })

    test("fetch page failure", () => {
        expect(recipient({}, { type: recipientConstants.FETCH_PAGE_FAILURE, })).toEqual({
            fetchingPage: false
        })
    })

    test("fetch tag request", () => {
        expect(recipient({}, { type: recipientConstants.FETCH_TAGS_REQUEST, })).toEqual({
            fetchingTags: true
        })
    })

    test("fetch tag success", () => {
        expect(recipient({}, { type: recipientConstants.FETCH_TAGS_SUCCESS, tags: "tags" })).toEqual({
            fetchingTags: false,
            tags: "tags"
        })
    })

    test("fetch tag failure", () => {
        expect(recipient({}, { type: recipientConstants.FETCH_TAGS_FAILURE })).toEqual({
            fetchingTags: false,
        })
    })

    test("add recipient request", () => {
        expect(recipient({}, { type: recipientConstants.ADD_RECIPIENT_REQUEST })).toEqual({
            addingRecipient: true
        })
    })

    test("add recipient success", () => {
        expect(recipient({}, { type: recipientConstants.ADD_RECIPIENT_SUCCESS, recipients: "recipients" })).toEqual({
            addingRecipient: false,
            recipients: "recipients"
        })
    })

    test("add recipient failure", () => {
        expect(recipient({}, { type: recipientConstants.ADD_RECIPIENT_FAILURE, recipients: "recipients" })).toEqual({
            addingRecipient: false,
        })
    })

    test("edit recipient request", () => {
        expect(recipient({}, { type: recipientConstants.EDIT_RECIPIENT_REQUEST, recipients: "recipients" })).toEqual({
            editingRecipient: true
        })
    })

    test("edit recipient success", () => {
        expect(recipient({
            recipients: { data: [{ _id: "123" }] },
            searchRecipients: { data: [{ _id: "123" }] }
        },
            { type: recipientConstants.EDIT_RECIPIENT_SUCCESS, recipient: { data: { _id: "123" } } }))
            .toEqual({
                editingRecipient: false,
                recipients: { data: [{ _id: "123" }] }, searchRecipients: { data: [{ _id: "123", }] }
            })
    })

    test("edit recipient failure", () => {
        expect(recipient({}, { type: recipientConstants.EDIT_RECIPIENT_FAILURE })).toEqual({
            editingRecipient: false
        })
    })

    test("add tag request", () => {
        expect(recipient({}, { type: recipientConstants.ADD_TAG_REQUEST })).toEqual({
            addingTag: true
        })
    })

    test("add tag success", () => {
        expect(recipient({}, { type: recipientConstants.ADD_TAG_SUCCESS, tags: "tags" })).toEqual({
            addingTag: false,
            tags: "tags"
        })
    })

    test("add tag failure", () => {
        expect(recipient({}, { type: recipientConstants.ADD_TAG_FAILURE })).toEqual({
            addingTag: false,
        })
    })

    test("delete recipient request", () => {
        expect(recipient({}, { type: recipientConstants.DELETE_RECIPIENT_REQUEST, recipient: "recipient" })).toEqual({
            deleting: "recipient"
        })
    })

    test("delete recipient success", () => {
        expect(recipient({ recipients: { data: [{ _id: "123" }] } }, { type: recipientConstants.DELETE_RECIPIENT_SUCCESS, recipient: { recipient: { _id: "123" } } })).toEqual({
            deleting: false,
            recipients: {
                data: [],
            }
        })
    })

    test("delete recipient request", () => {
        expect(recipient({}, { type: recipientConstants.DELETE_RECIPIENT_REQUEST, recipient: "recipient" })).toEqual({
            deleting: "recipient"
        })
    })

    test("delete recipient failure", () => {
        expect(recipient({}, { type: recipientConstants.DELETE_RECIPIENT_FAILURE })).toEqual({
            deleting: false
        })
    })

    test("delete tag request", () => {
        expect(recipient({}, { type: recipientConstants.DELETE_TAG_REQUEST, tag: "tag" })).toEqual({
            deletingTag: "tag"
        })
    })

    test("delete tag success", () => {
        expect(recipient({ tags: [{ _id: "123" }] }, { type: recipientConstants.DELETE_TAG_SUCCESS, tag: "tag" })).toEqual({
            deletingTag: false,
            "tags": [{ "_id": "123", },]
        })
    })

    test("delete tag failure", () => {
        expect(recipient({}, { type: recipientConstants.DELETE_TAG_FAILURE, })).toEqual({
            deletingTag: false
        })
    })

    test("add tag to recipient request", () => {
        expect(recipient({}, { type: recipientConstants.ADD_TAG_TO_RECIPIENT_REQUEST, })).toEqual({
            addingTagToRecipient: true
        })
    })

    test("add tag to recipient success", () => {
        expect(recipient({ recipients: { data: [{ _id: "123" }] } }, { type: recipientConstants.ADD_TAG_TO_RECIPIENT_SUCCESS, recipient: { _id: "123" } })).toEqual({
            addingTagToRecipient: false,
            "recipients": { "data": [{ "_id": "123" }] }
        })
    })

    test("add tag to recipient failure", () => {
        expect(recipient({}, { type: recipientConstants.ADD_TAG_TO_RECIPIENT_FAILURE, })).toEqual({
            addingTagToRecipient: false
        })
    })
})