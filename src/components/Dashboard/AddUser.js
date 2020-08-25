import React from "react"
import InviteUsers from "components/onboarding/steps/inviteUsers";

const AddUser = () => {
    return (
        <div className={`full-width full-height overflow-scroll-y custom-scrollbar`}>
            <div className={`onboarding bottom-padding-150 smooth overflow-hidden width-70-percent margin-auto top-margin-70 bottom-margin-5-percent border-box top-padding-50 white border-radius-10 box-shadow-less2`}>
                <InviteUsers />
                <div className="height-80 white full-width absolute bottom border-top-lightgray left-padding-80 right-padding-60 border-box display-flex align-items-center flex-end">
                    <button className="left-padding-30 right-padding-30 height-45 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddUser;