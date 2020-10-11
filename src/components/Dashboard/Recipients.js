/* eslint-disable */

import React, { useState, useEffect, useRef } from "react"
import Recipient from "./snippets/Recipient";
import Pagination from "./snippets/Pagination";
import Toolbox from "./snippets/Toolbox";
import PageTitle from "./snippets/PageTitle";
import ViewTag from "./snippets/ViewTag";
import ModalContainer from "./modals/ModalContainer";
import AddRecipient from "./modals/AddRecipient";
import CreateTag from "./modals/CreateTag";
import EmptyRecipient from "./empty-states/Recipient";
import { recipientActions } from "actions/recipientActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { push } from "connected-react-router";

const Recipients = ({ user }) => {
    const [recipient, setRecipient] = useState({});
    const [editRecipient, setEditRecipient] = useState({});
    const [tag, setTag] = useState({});
    const [toAddTag, setToAddTag] = useState(false);
    const [toAddTags, setToAddTags] = useState([]);
    const [viewingTags, setViewingTags] = useState(false);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState({
        search: ""
    });
    const [filter, setFilter] = useState([]);
    const [timer, setTimer] = useState();

    const dispatch = useDispatch();
    const recipients = useSelector(state => state.recipient);

    let { pageId } = useParams();
    const page = useRef(null);

    useEffect(() => {
        if (pageId) {
            page.current.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(recipientActions.fetchPage(pageId));
        } else {
            dispatch(recipientActions.fetch());
        }
    }, [dispatch, pageId]);

    useEffect(() => {
        if (filter.length > 0 || search.search !== "") {
            dispatch(recipientActions.search(search.search, filter));
        }
    }, [dispatch, filter]);

    useEffect(() => {
        if (viewingTags === true) {
            dispatch(recipientActions.fetchTags());
        }
    }, [viewingTags, dispatch]);

    useEffect(() => {
        if (recipients.addingTag === false) {
            setModal(false);
            setTag({});
        }
    }, [recipients.addingTag]);

    useEffect(() => {
        if (recipients.addingRecipient === false || recipients.editingRecipient === false) {
            setModal(false);
            setRecipient({});
        }
    }, [recipients.addingRecipient, recipients.editingRecipient]);

    useEffect(() => {
        if (recipients.addingTagToRecipient === false) {
            closeTags();
        }
    }, [recipients.addingTagToRecipient]);

    const onChangeSearch = event => {
        const { name, value } = event.target;

        setSearch({
            ...search,
            [name]: value
        });

        if (event.target.value !== "") {
            if (timer) {
                clearTimeout(timer);
            }

            setTimer(() => {
                return setTimeout(() => {
                    dispatch(recipientActions.search(value));
                }, 1000);
            });
        }
    }

    const onChangeRecipient = event => {
        const { name, value } = event.target;

        setRecipient({
            ...recipient,
            [name]: value
        });
    }

    const onChangeRecipientEdit = event => {
        const { name, value } = event.target;

        setEditRecipient({
            ...editRecipient,
            [name]: value
        });
    }

    const onChangeTag = event => {
        const { name, value } = event.target;

        setTag({
            ...tag,
            [name]: value
        });
    }

    const viewTags = () => {
        setViewingTags(true);
    }

    const closeTags = () => {
        setViewingTags(false);
        setToAddTag(false);
        setToAddTags([]);
    }

    const addRecipient = e => {
        e.preventDefault();

        if (modal === "edit-recipient") {
            dispatch(recipientActions.edit(editRecipient));
        } else {
            dispatch(recipientActions.add(recipient));
        }
    }

    const deleteRecipient = recipient => {
        dispatch(recipientActions.deleteRecipient(recipient));
    }

    const addTag = e => {
        e.preventDefault();

        dispatch(recipientActions.addTag(tag));
    }

    const addTagsToRecipient = () => {
        dispatch(recipientActions.addTagsToRecipient(toAddTag, toAddTags));
    }

    const deleteTag = (e, tag) => {
        e.stopPropagation();
        dispatch(recipientActions.deleteTag(tag));
    }

    const initiateEdit = recipient => {
        setToAddTag(recipient);
        setToAddTags(recipients.recipients.data.find(rec => rec._id === recipient).tag);

        setViewingTags(true);
    }

    const parseCSV = file => {
        var reader = new FileReader();
        reader.readAsText(file.target.files[0], "UTF-8");

        reader.onload = function (e) {
            var csv = e.target.result;
            var allTextLines = csv.split('\n');

            let recipientArr = [];

            for (var i = 0; i < allTextLines.length; i++) {
                var data = allTextLines[i].split(',');

                var row = {
                    name: data[0].replace( /[\r\n]+/gm, "" ),
                    email: data[1].replace( /[\r\n]+/gm, "" )
                };

                recipientArr.push(row);
            }

            dispatch(recipientActions.add(recipientArr, true));
        }

        file.target.value = null;
    }

    const viewPage = page => {
        if (page <= recipients.recipients.pagination.number_of_pages && page !== recipients.recipients.pagination.current) {
            dispatch(push(`/dashboard/recipients/${page}`));
        }
    }

    return (
        <>
            {modal !== false ?
                <ModalContainer closeModal={() => setModal(false)}>
                    {modal === "add-recipient" || modal === "edit-recipient" ?
                        <AddRecipient
                            recipient={recipient}
                            editRecipient={editRecipient}
                            modal={modal}
                            creating={recipients.addingRecipient || recipients.editingRecipient}
                            onChange={onChangeRecipient}
                            onChangeEdit={onChangeRecipientEdit}
                            onSubmit={addRecipient}
                            closeModal={() => { setModal(false); setEditRecipient({}); setRecipient({}); }} />
                        : ""}
                    {modal === "create-tag" ?
                        <CreateTag
                            tag={tag}
                            creating={recipients.addingTag}
                            onChange={onChangeTag}
                            onSubmit={addTag}
                            closeModal={() => setModal(false)} />
                        : ""}
                </ModalContainer>
                : ""}
            <div ref={page} className="full-width full-height custom-scrollbar overflow-auto-y border-box left-padding-30 right-padding-30">
                <PageTitle
                    title="Recipients"
                />
                <Toolbox
                    user={user}
                    tag={true}
                    upload={true}
                    parseCSV={parseCSV}
                    viewTags={viewTags}
                    closeTags={closeTags}
                    adding={recipients.addingRecipient}
                    viewingTags={viewingTags}
                    setModal={setModal}
                    onChange={onChangeSearch}
                    search={search}
                    filter={filter}
                    addFilter={f => { setFilter(filter => ([...filter, f])) }}
                    removeFilter={f => { setFilter(filter => (filter.filter(item => item !== f))) }}
                    addButtonText="Add Recipient" />
                <div className="overflow-hidden white border-radius-10 left-padding-10 right-padding-10 top-margin-30 bottom-margin-50 min-height-500">
                    <ViewTag
                        recipients={recipients.recipients}
                        tags={recipients.tags}
                        updating={recipients.addingTagToRecipient}
                        deleting={recipients.deletingTag}
                        toAddTag={toAddTag}
                        toAddTags={toAddTags}
                        closeTags={closeTags}
                        setModal={setModal}
                        viewingTags={viewingTags}
                        setToAddTags={setToAddTags}
                        addTagsToRecipient={addTagsToRecipient}
                        deleteTag={deleteTag}
                    />
                    <div className="full-width display-flex space-between top-padding-30">
                        <div className="width-40 height-40 right-margin-20 left-margin-10"></div>
                        <div className="no-shrink width-25-percent size-one-rem bold gray-color opacity-0-5">
                            #
                        </div>
                        <div className="no-shrink width-20-percent size-one-rem bold gray-color opacity-0-5">
                            Email address
                        </div>
                        <div className="no-shrink width-20-percent right-padding-20 left-padding-20 size-one-rem bold gray-color opacity-0-5">
                            Tag
                        </div>
                        <div className="bold no-shrink height-25 width-100 right-margin-50 border-box opacity-0-5">
                            Status
                        </div>
                        <div className="no-shrink width-50 size-pointnine-rem right-margin-30"></div>
                    </div>
                    {recipients.recipients === undefined || (recipients.searching) ?
                        <EmptyRecipient />
                        :
                        (search.search !== "" || filter.length > 0) && recipients.searchRecipients ?
                            <>
                                {recipients.searchRecipients.data.map((recipient, index) =>
                                    <Recipient
                                        key={index}
                                        setModal={setModal}
                                        setEditRecipient={setEditRecipient}
                                        deleteRecipient={deleteRecipient}
                                        recipient={recipient}
                                        toAddTag={toAddTag}
                                        initiateEdit={initiateEdit}
                                        recipientBeingDeleted={recipients.deleting} />
                                )}
                                <Pagination
                                    data={recipients.searchRecipients}
                                    viewPage={viewPage}
                                />
                            </>
                            :
                            <>
                                {recipients.recipients.data.map((recipient, index) =>
                                    <Recipient
                                        key={index}
                                        setModal={setModal}
                                        setEditRecipient={setEditRecipient}
                                        deleteRecipient={deleteRecipient}
                                        recipient={recipient}
                                        toAddTag={toAddTag}
                                        initiateEdit={initiateEdit}
                                        recipientBeingDeleted={recipients.deleting} />
                                )}
                                <Pagination
                                    data={recipients.recipients}
                                    viewPage={viewPage}
                                />
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default Recipients;