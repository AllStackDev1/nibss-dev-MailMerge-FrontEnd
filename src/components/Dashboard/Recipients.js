import React from "react"
import Recipient from "./snippets/Recipient";
import Pagination from "./snippets/Pagination";
import Toolbox from "./snippets/Toolbox";
import PageTitle from "./snippets/PageTitle";

const Recipients = () => {
    return (
        <div className="full-width border-box left-padding-30 right-padding-30">
            <PageTitle
                title="Recipients"
            />
            <Toolbox
                tag={true}
                addButtonText="Add Recipient" />
            <div className="white border-radius-10 left-padding-10 right-padding-10 top-margin-30 bottom-margin-50">
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
                <Recipient />
                <Recipient />
                <Recipient />
                <Recipient />
                <Recipient />
                <Recipient />
                <Recipient />
                <Recipient />
                <Pagination />
            </div>
        </div>
    )
}

export default Recipients;