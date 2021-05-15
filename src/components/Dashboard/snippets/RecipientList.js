import React from 'react'
import EmptyRecipient from '../empty-states/EmptyRecipient';
import Pagination from './Pagination';
import Recipient from './Recipient';

const RecipientList = ({ recipients, search, filter, setModal, setEditRecipient, initiateDeleteRecipient, toAddTag,
    initiateEdit, viewPage, localUserRole }) => {
    const renderRecipients = () => {
        if (recipients?.recipients === undefined || (recipients?.searching)) {
            return <EmptyRecipient />;
        }

        const toLoop = (search.search !== "" || filter.length > 0) && recipients.searchRecipients ?
            recipients.searchRecipients :
            recipients.recipients;

        return <>
            {(toLoop).data.map((r, index) =>
                <Recipient
                    key={index}
                    setModal={setModal}
                    setEditRecipient={setEditRecipient}
                    deleteRecipient={initiateDeleteRecipient}
                    recipient={r}
                    toAddTag={toAddTag}
                    initiateEdit={initiateEdit}
                    recipientBeingDeleted={recipients.deleting}
                    localUserRole={localUserRole}
                />
            )}
            <Pagination
                data={toLoop}
                viewPage={viewPage}
            />
        </>
    }

    return (
        <>
            <div className="full-width display-flex space-between top-padding-30">
                <div className="width-40 height-40 right-margin-20 left-margin-10"></div>
                <div className="no-shrink width-25-percent size-one-rem bold gray-color opacity-0-5">
                    Full Name
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
            {renderRecipients()}
        </>
    )
}

export default RecipientList;
