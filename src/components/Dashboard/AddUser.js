import React from "react"
import InviteUsers from "components/onboarding/steps/inviteUsers";

const AddUser = () => {
    return (
        <div className={`full-width full-height overflow-scroll-y custom-scrollbar`}>
            <div className={`onboarding bottom-padding-150 smooth overflow-hidden width-70-percent margin-auto top-margin-70 bottom-margin-5-percent border-box top-padding-50 white border-radius-10 box-shadow-less2`}>
                <InviteUsers
                    add={true} />
            </div>
        </div>
    )
}

export default AddUser;
