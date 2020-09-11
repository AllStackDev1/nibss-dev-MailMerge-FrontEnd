import React from 'react'

const DocumentCreationSuccessful = ({ setUploadingDocument }) => {
    return (
        <div className="full-height left-padding-80 right-padding-80 display-flex flex-direction-column justify-center align-items-center">
            <img src={require(`images/icons/onboarding-successful.svg`)} className="height-80 bottom-margin-30" alt="Invite users" />
            <p className="size-onepointfive-rem bold bottom-padding-10 text-center">Document Completed and Sent</p>
            <p className="size-pointeight-rem light-gray-color text-center bottom-margin-30">You have sucessfully created a document and sent to recipients</p>
            <button onClick={() => setUploadingDocument(false)} type="button" className="left-padding-30 right-padding-30 height-50 width-300 mustard border-radius-2 display-flex align-items-center justify-center">
                <span className="white-color bold size-pointeightfive-rem left-padding-10">CONTINUE TO DOCUMENTS</span>
            </button>
        </div>
    )
}

export default DocumentCreationSuccessful;