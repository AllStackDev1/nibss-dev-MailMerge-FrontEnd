import React, { useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { recipientActions } from "actions/recipientActions";
import EmptyDocumentRecipient from "components/Dashboard/empty-states/DocumentRecipient";
import { getColor } from "helpers/getColor";
import { getInitials } from "helpers/getInitials";

const SetupRecipients = ({ document, addRecipient }) => {
    const dispatch = useDispatch();

    const recipients = useSelector(state => state.recipient);

    useEffect(() => {
        dispatch(recipientActions.fetch());
    }, [dispatch]);

    return (
        <>
            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">
                Select Recipients
                <span className="light size-pointnine-rem">{document.recipients.length > 0 ? ` - ${document.recipients.length} selected` : ""}</span>
            </p>
            <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Tell us who will be getting this documenmts</p>
            <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>
            <div className="display-flex width-85-percent space-between top-margin-30">
                <input type="text" name="name" placeholder="search name" className="height-40 width-250" required />
                <div className="display-flex align-items-center justify-center cursor-pointer left-padding-15 right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color right-margin-20">
                    <img src={require(`images/icons/dashboard/filter.svg`)} className={`height-15 right-margin-10`} alt="Filter" />
                    Filter By
                    <span className="material-icons">
                        arrow_drop_down
                    </span>
                </div>
            </div>
            <div className="full-height width-85-percent top-margin-40 border-box overflow-auto-y custom-scrollbar">
                {recipients.recipients ?
                    recipients.recipients.data.map((recipient, index) =>
                        <div key={index} onClick={() => addRecipient(recipient)} className="cursor-pointer display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                            <input type="checkbox" id="charter-requests" className="checkbox-s" checked={document.recipients.findIndex(rec => rec._id === recipient._id) !== -1} />
                            <label htmlFor="charter-requests" className="no-shrink"></label>
                            <Profile style={{ backgroundColor: getColor(recipient.name) }} className="white-color display-flex align-items-center justify-center size-pointeight-rem bold no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20">
                                {getInitials(recipient.name)}
                            </Profile>
                            <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                {recipient.name}
                            </div>
                            <div className="no-shrink width-30-percent size-pointeight-rem">
                                <p className="size-pointeight-rem light-gray-color truncate">{recipient.email}</p>
                            </div>
                        </div>)
                    :
                    <EmptyDocumentRecipient />
                }
            </div>
        </>
    )
}

const Profile = styled.div`background-image: url(${props => props.url});
                        background-position: center;
                        background-size: cover;`;

export default SetupRecipients;