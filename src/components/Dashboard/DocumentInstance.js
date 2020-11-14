import { documentActions } from "actions/documentActions";
import { push } from "connected-react-router";
import React, { useEffect, useState } from "react"
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Log from "./snippets/documents/Log";
import PageTitle from "./snippets/PageTitle";
import { Document, Page, pdfjs } from "react-pdf";
import DocumentTab from "./snippets/documents/DocumentTab";
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const DocumentInstance = ({ user }) => {
    const [tab, setTab] = useState(1);
    const [document, setDocument] = useState({});
    const [imageError, setImageError] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const documents = useSelector(state => state.document);

    const { documentId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(documentActions.fetchSingle(documentId));
    }, [dispatch, documentId]);

    useEffect(() => {
        if (documents.fetchingSingle === false && documents.document) {
            setDocument(documents.document);
        }
    }, [documents.fetchingSingle, documents.document]);

    const goBack = () => {
        dispatch(push('/dashboard/documents'));
    }

    function onDocumentLoadSuccess({ numPages: num }) {
        setNumPages(num);
    }

    // RENDER HELPER
    const renderFile = () => {
        if (imageError === false) {
            const pageStyle = `${numPages === undefined ? 'width-75-percent' : ''}`;

            return <PageContainer className={pageStyle}>
                <img
                    onError={() => setImageError(true)}
                    src={document.document?.file}
                    className="full-width right-margin-10" alt="NIBSS Upload Document" />
            </PageContainer>
        }

        return <Document
            file={document.document?.file}
            onLoadSuccess={onDocumentLoadSuccess}>
            {[...Array(numPages)].map((el, index) => (
                <PageContainer
                    key={index}
                    className={`${index} ${numPages === undefined ? 'width-75-percent' : 'min-content margin-auto'} bottom-margin-20`}>
                    <Page width={700} key={`page_${index + 1}`} pageNumber={index + 1} />
                </PageContainer>
            ))}
        </Document>
    }

    const renderLogs = () => {
        if (!document.logs) {
            return "Loading ...."
        }

        return document.logs?.map((log, index) =>
            <Log log={log} />)

    }

    const renderDeliveryReport = () => {
        if (!document.document) {
            return "Loading ..."
        }

        return <>
            <div className="full-width display-flex">
                <div className="width-70-percent border-box right-margin-50 display-flex">
                    <BorderGray className="width-25-percent top-padding-30 bottom-padding-30 right-margin-15 text-center">
                        <p className="mustard-color bold size-pointnine">{document?.document?.recipients?.length || 0}</p>
                        <p className="size-one-rem bold bottom-margin-30">Emails</p>
                        <Status className="border-radius-20 size-pointeight-rem">
                            Total
                </Status>
                    </BorderGray>
                    <BorderGray className="width-25-percent top-padding-30 bottom-padding-30 right-margin-15 text-center">
                        <p className="mustard-color bold size-pointnine">{document?.document?.recipients?.length || 0}</p>
                        <p className="size-one-rem bold bottom-margin-30">100%</p>
                        <Status className="delivered border-radius-20 size-pointeight-rem">
                            Delivered
                </Status>
                    </BorderGray>
                    <BorderGray className="width-25-percent top-padding-30 bottom-padding-30 right-margin-15 text-center">
                        <p className="mustard-color bold size-pointnine">{document?.document?.stats?.open || 0}</p>
                        <p className="size-one-rem bold bottom-margin-30">90%</p>
                        <Status className="border-radius-20 size-pointeight-rem">
                            Opened
                </Status>
                    </BorderGray>
                    <BorderGray className="width-25-percent top-padding-30 bottom-padding-30 text-center">
                        <p className="mustard-color bold size-pointnine">{document?.document?.stats?.clicked || 0}</p>
                        <p className="size-one-rem bold bottom-margin-30">90%</p>
                        <Status className="border-radius-20 size-pointeight-rem">
                            Clicked
                        </Status>
                    </BorderGray>
                </div>
                <BorderGray className="width-30-percent border-box no-shrink padding-30 display-flex flex-direction-column space-between">
                    <div className="full-width display-flex size-pointnine-rem">
                        <div className="width-50 no-shrink height-30">{document?.document?.stats?.blocked || 0}</div>
                        <div className="full-width height-30">(0%) Blocked</div>
                    </div>
                    <div className="full-width display-flex size-pointnine-rem">
                        <div className="width-50 no-shrink height-30">{document?.document?.stats?.bounced || 0}</div>
                        <div className="full-width height-30">(0%) Bounced</div>
                    </div>
                    <div className="full-width display-flex size-pointnine-rem">
                        <div className="width-50 no-shrink height-30">{document?.document?.stats?.spam || 0}</div>
                        <div className="full-width height-30">(0%) Marked as spam</div>
                    </div>
                </BorderGray>
            </div>
            <div className="full-width top-margin-50">
                <div className="full-width display-flex bottom-margin-20">
                    <div className="width-30-percent size-pointnine-rem no-shrink bold">Recipient Name</div>
                    <div className="width-30-percent size-pointnine-rem no-shrink bold">Email</div>
                    <div className="width-20-percent size-pointnine-rem no-shrink bold">Status</div>
                    <div className="width-20-percent size-pointnine-rem no-shrink bold">Date</div>
                </div>
                {document.document?.recipients?.map((recipient, index) =>
                    <div className="full-width display-flex bottom-margin-20" key={index}>
                        <div className="width-30-percent size-pointeight-rem no-shrink capitalize">{recipient.name}</div>
                        <div className="width-30-percent size-pointeight-rem no-shrink">{recipient.email}</div>
                        <div className="width-20-percent size-pointeight-rem no-shrink">
                            <Status className={`${!recipient.open ? 'delivered' : ''} border-radius-20 size-pointeight-rem`}>
                                {recipient.open ? 'Opened' : 'Pending'}
                            </Status>
                        </div>
                        <div className="width-20-percent size-pointeight-rem no-shrink">
                            <Moment format={'Do MMM, YYYY'}>{Date.now()}</Moment>
                        </div>
                    </div>
                )}
            </div>
        </>
    }

    return (
        <div className="full-width full-height custom-scrollbar overflow-auto-y bottom-padding-20 border-box left-padding-30 right-padding-30">
            <BackButton onClick={goBack} className="cursor-pointer display-flex size-pointnine-rem align-items-center mustard-color left above bold">
                <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                BACK
            </BackButton>
            <PageTitle
                title="Document"
            />
            <div className={`min-height-600 full-width white border-radius-10 top-margin-30 box-shadow-less2`}>
                <div className="height-50 full-width border-bottom-gray display-flex">
                    <DocumentTab
                        label="LOGS"
                        tab={tab}
                        setTab={setTab}
                        index={1} />
                    <DocumentTab
                        label="DELIVERY REPORT"
                        tab={tab}
                        setTab={setTab}
                        index={2} />
                    <DocumentTab
                        label="VIEW DOCUMENT"
                        tab={tab}
                        setTab={setTab}
                        index={3} />
                </div>
                <div className="padding-30 full-width border-box">
                    {tab === 1 && renderLogs()}
                    {tab === 2 &&
                        <div className="full-width">
                            {renderDeliveryReport()}
                        </div>
                    }
                    {
                        tab === 3 && renderFile()
                    }
                </div>
            </div>
        </div >
    )
}

const BackButton = styled.div`
                            width: 200px;
                            left: 0;
                            margin-top: 30px;
                            margin-bottom: -50px;
                            &:hover span {
                                margin-right: 10px;
                            }
                        `;

const BorderGray = styled.div`
    border: 1px solid #EDEDED;
`;

const Status = styled.span`
    background: #CFFFE1;
    color: #00B946;
    padding: 5px 20px;
    &.delivered {
        background: #F7F7F7;
        color: #BDBDBD;
    }
`;

const PageContainer = styled.div`
                        border: 1px solid #CCC !important;
                        &:hover {
                            border: 1px dashed #d8d8d8 !important;
                        }
                    `;

export default DocumentInstance;
