import React from "react"
import SaveSignature from "components/onboarding/steps/saveSignature";

// handle add signature
const AddSignature = () => {
    return (
        <div className={`full-width full-height overflow-scroll-y custom-scrollbar`}>
            <div className={`
                onboarding 
                bottom-padding-150 
                smooth 
                overflow-hidden 
                width-70-percent 
                margin-auto 
                top-margin-70 
                bottom-margin-5-percent 
                border-box 
                top-padding-50 
                white 
                border-radius-10 
                box-shadow-less2`}>
                <SaveSignature
                    add={true} />
            </div>
        </div>
    )
}

export default AddSignature;
