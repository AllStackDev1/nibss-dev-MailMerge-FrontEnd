/* eslint-disable */
import React, { useState, useEffect, useRef } from "react"
import Toolbox from "./snippets/Toolbox";
import PageTitle from "./snippets/PageTitle";
import ViewTag from "./snippets/ViewTag";
import ModalContainer from "./modals/ModalContainer";
import AddRecipient from "./modals/AddRecipient";
import CreateTag from "./modals/CreateTag";
import { recipientActions } from "actions/recipientActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { push } from "connected-react-router";
import DeleteTag from "./modals/DeleteTag";
import DeleteRecipient from "./modals/DeleteRecipient";
import RecipientList from "./snippets/RecipientList";

const Recipients = ({ user }) => {
    const [recipient, setRecipient] = useState({});
    const [editRecipient, setEditRecipient] = useState({});
    const [tag, setTag] = useState({});
    const [toAddTag, setToAddTag] = useState(false);
    const [toAddTags, setToAddTags] = useState([]);
    const [viewingTags, setViewingTags] = useState(false);
    const [modal, setModal] = useState("");
    const [tagToDelete, setTagToDelete] = useState({});
    const [recipientToDelete, setRecipientToDelete] = useState({});
    const [search, setSearch] = useState({
        search: ""
    });
    const [filter, setFilter] = useState([]);
    const [timer, setTimer] = useState();
    const dispatch = useDispatch();
    const recipients = useSelector(state => state.recipient);
    const { pageId } = useParams();
    const page = useRef(null);

    useEffect(() => {
        if (pageId) {
            // page.current.scrollTo({ top: 0, behavior: 'smooth' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        if (recipients?.addingTag === false) {
            setModal("");
            setTag({});
        }
        if (recipients?.deletingTag === false) {
            setModal("");
            setTagToDelete({});
        }
        if (recipients?.deleting === false) {
            setModal("");
            setRecipientToDelete({});
        }
    }, [recipients?.addingTag, recipients?.deleting, recipients?.deletingTag]);
    useEffect(() => {
        if (recipients?.addingRecipient === false || recipients?.editingRecipient === false) {
            setModal("");
            setRecipient({});
        }
    }, [recipients?.addingRecipient, recipients?.editingRecipient]);
    useEffect(() => {
        if (recipients?.addingTagToRecipient === false) {
            closeTags();
        }
    }, [recipients?.addingTagToRecipient]);
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
    const initiateDeleteRecipient = r => {
        setRecipientToDelete(r);
        setModal("delete-recipient");
    }
    const deleteRecipient = () => {
        dispatch(recipientActions.deleteRecipient(recipientToDelete));
    }
    const addTag = e => {
        e.preventDefault();
        dispatch(recipientActions.addTag(tag));
    }

    const addTagsToRecipient = () => {
        dispatch(recipientActions.addTagsToRecipient(toAddTag, toAddTags));
    }

    const initiateDeleteTag = (t) => {
        setTagToDelete(t);
        setModal("delete-tag");
    }

    const deleteTag = () => {
        dispatch(recipientActions.deleteTag(tagToDelete));
    }

    const initiateEdit = r => {
        setToAddTag(r);
        setToAddTags(recipients.recipients.data.find(rec => rec._id === r).tag);
        setViewingTags(true);
    }

    const viewPage = p => {
        if (p <= recipients.recipients.pagination.number_of_pages && p !== recipients.recipients.pagination.current) {
            dispatch(push(`/dashboard/recipients/${p}`));
        }
    }

    const renderModal = () => {
        if (modal === "add-recipient" || modal === "edit-recipient") {
            return <AddRecipient
                recipient={recipient} editRecipient={editRecipient} modal={modal} creating={recipients.addingRecipient || recipients.editingRecipient}
                onChange={onChangeRecipient} onChangeEdit={onChangeRecipientEdit} onSubmit={addRecipient}
                closeModal={() => {
                    setModal("");
                    setEditRecipient({});
                    setRecipient({});
                }} />
        }
        if (modal === "create-tag") {
            return <CreateTag tag={tag} creating={recipients.addingTag} onChange={onChangeTag} onSubmit={addTag} closeModal={() => setModal("")} />
        }
        if (modal === "delete-tag") {
            return <DeleteTag deleting={recipients.deletingTag} onSubmit={deleteTag}
                closeModal={() => {
                    setModal("");
                    setTagToDelete({});
                }} />
        }
        if (modal === "delete-recipient") {
            return <DeleteRecipient
                deleting={recipients.deleting} onSubmit={deleteRecipient}
                closeModal={() => {
                    setModal("");
                    setRecipientToDelete({});
                }} />
        }
        return <div></div>;
    }

    return (
        <>
            {modal !== "" &&
                <ModalContainer closeModal={() => setModal("")}>
                    {renderModal()}
                </ModalContainer>}
            <div ref={page} className="full-width full-height custom-scrollbar overflow-auto-y border-box left-padding-30 right-padding-30">
                <PageTitle title="Recipients" />
                <Toolbox user={user} tag={true} upload={true} setViewingTags={setViewingTags} closeTags={closeTags}
                    adding={recipients?.addingRecipient} viewingTags={viewingTags} setModal={setModal} onChange={onChangeSearch}
                    search={search} filter={filter} addFilter={f => { setFilter(filterS => ([...filterS, f])) }}
                    removeFilter={f => { setFilter(filterS => (filterS.filter(item => item !== f))) }} addButtonText="Add Recipient" />
                <div className="overflow-hidden white border-radius-10 left-padding-10 right-padding-10 top-margin-30 bottom-margin-50 min-height-500">
                    <ViewTag recipients={recipients?.recipients} tags={recipients?.tags} updating={recipients?.addingTagToRecipient}
                        deleting={recipients?.deletingTag} toAddTag={toAddTag} toAddTags={toAddTags} closeTags={closeTags}
                        setModal={setModal} viewingTags={viewingTags} setToAddTags={setToAddTags} addTagsToRecipient={addTagsToRecipient}
                        deleteTag={initiateDeleteTag} />
                    <RecipientList recipients={recipients} search={search} filter={filter}
                        setModal={setModal} setEditRecipient={setEditRecipient} initiateDeleteRecipient={initiateDeleteRecipient}
                        toAddTag={toAddTag} initiateEdit={initiateEdit} viewPage={viewPage} />
                </div>
            </div>
        </>
    )
}

export default Recipients;
