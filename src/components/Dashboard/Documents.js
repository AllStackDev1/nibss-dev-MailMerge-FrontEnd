import React, { useState } from "react"
import styled from "styled-components"
import Document from "./snippets/Document";
import Pagination from "./snippets/Pagination";
import PageTitle from "./snippets/PageTitle";

const Documents = () => {
    const [tab, setTab] = useState(1);

    return (
        <div className="full-width border-box left-padding-30 right-padding-30">
            <PageTitle
                title="Documents"
            />
            <Tabs className="height-60 full-width display-flex no-select">
                <Tab onClick={() => setTab(1)} className={`${tab === 1 ? 'active-tab' : ''} width-25-percent cursor-pointer size-pointeightfive-rem display-flex align-items-center justify-center`}>
                    All Documents (20)
                    <div className="full-width height-0 smooth"></div>
                </Tab>
                <Tab onClick={() => setTab(2)} className={`${tab === 2 ? 'active-tab' : ''} width-25-percent cursor-pointer size-pointeightfive-rem display-flex align-items-center justify-center`}>
                    Pending Documents
                    <div className="full-width height-0 smooth"></div>
                </Tab>
                <Tab onClick={() => setTab(3)} className={`${tab === 3 ? 'active-tab' : ''} width-25-percent cursor-pointer size-pointeightfive-rem display-flex align-items-center justify-center`}>
                    Signed Documents
                    <div className="full-width height-0 smooth"></div>
                </Tab>
                <Tab onClick={() => setTab(4)} className={`${tab === 4 ? 'active-tab' : ''} width-25-percent cursor-pointer size-pointeightfive-rem display-flex align-items-center justify-center`}>
                    Rejected Documents
                    <div className="full-width height-0 smooth"></div>
                </Tab>
            </Tabs>
            <UploadButton className="cursor-pointer top-margin-30 bottom-margin-20 full-width height-60 display-flex align-items-center justify-center size-pointeight-rem bold">
                <img src={require(`images/icons/dashboard/upload.svg`)} className="height-20 right-margin-10" alt="NIBSS Upload Document" />
                Upload a document
            </UploadButton>
            <Document />
            <Document />
            <Document />
            <Document />
            <Document />
            <Document />
            <Document />
            <Document />
            <Pagination />
        </div>
    )
}

const UploadButton = styled.div`
                                border: 2px dashed rgba(145, 154, 163, 0.2);
                                color: #182538;
                            `;

const Tabs = styled.div`
                        border: 1px solid #DDD;
                        margin-top: 30px;
                        margin-bottom: 20px;
                    `;

const Tab = styled.div`
                        &.active-tab {
                            background: rgba(158, 125, 10, 0.3);
                            font-weight: bold;
                        }
                        &.active-tab, &:hover {
                            color: #9E7D0A;
                        }
                        & > div {
                            background: #9E7D0A;
                            position: absolute;
                            bottom: 0;
                        }
                        &.active-tab > div, &:hover > div {
                            height: 3px;
                        }
                    `;

export default Documents;