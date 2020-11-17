/* eslint-disable */

import React, { useState, useCallback, useRef, useEffect } from "react"
import styled from "styled-components"
import PageTitle from "./snippets/PageTitle";
import ModalContainer from "./modals/ModalContainer";
import CreateDocument from "./modals/CreateDocument";
import DocumentCreationSuccessful from "./snippets/documents/DocumentCreationSuccessful";
import SetupSignatories from "./snippets/documents/SetupSignatories";
import SetupRecipients from "./snippets/documents/SetupRecipients";
import SigningSetup from "./snippets/documents/SigningSetup";
import RTE from "./snippets/documents/Preview";
import { useDispatch, useSelector } from "react-redux";
import { documentActions } from "actions/documentActions";
import DocumentList from "./snippets/documents/DocumentList";
import { useParams, withRouter } from "react-router-dom";
import qs from 'qs';
import { push } from "connected-react-router";

const Documents = withRouter(({ location }) => {
    const documents = useSelector(state => state.document);
    const [document, setDocument] = useState({
        signatories: [],
        recipients: []
    });


    const [documentFiles, setDocumentFiles] = useState([]);
    const [tab, setTab] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [step, setStep] = useState(1);
    const [uploadingDocument, setUploadingDocument] = useState(false);
    const [modal, setModal] = useState("");
    const [placeholders, setPlaceholders] = useState([]);

    const dispatch = useDispatch();
    const page = useRef(null);
    const { pageId } = useParams();

    const activeTabClass = 'active-tab';

    const tabClasses = `width-25-percent 
        cursor-pointer 
        size-pointeightfive-rem 
        display-flex 
        align-items-center 
        justify-center`;

    const documentStepClasses = `smooth 
        height-35 
        width-35 
        display-flex 
        align-items-center 
        justify-center 
        border-radius-100-percent`;

    const activeStepClass = 'active-step';
    const documentContainerClass = 'height-auto bottom-margin-50';
    const completeClass = "complete";

    const renderTabStats = (tabArg, key, total) => {
        if (documents?.documents) {
            const notTotal = tab === tabArg && fetching === false ?
                documents?.documents?.document_stats?.[key]
                : "";

            const statValue = tab === tabArg && fetching === false && total ?
                documents?.documents[key] : notTotal;

            if (statValue !== "") {
                return <span className="left-padding-5">{`(${statValue || 0})`}</span>
            }

            return <span></span>;
        }

        return <span></span>;
    }

    useEffect(() => {
        const type = qs.parse(location.search, { ignoreQueryPrefix: true }).type;

        const typeTabs = { "pending": 2, "signed": 3, "rejected": 4 };

        if (type) {
            setTab(typeTabs[type] || "");
        }

        if (pageId) {
            page.current.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(documentActions.fetchPage(type ? type : '', pageId));
        } else {
            dispatch(documentActions.fetch(type));
        }
    }, [dispatch, pageId]);

    useEffect(() => {
        if (documents.fetching === false) {
            setFetching(false);
        }
    }, [documents.fetching]);

    useEffect(() => {
        if (documents.preparing === false) {
            setDocument({
                signatories: [],
                recipients: []
            });
            setDocumentFiles([]);
            setTab(1);
            setStep(1);
            setUploadingDocument(false);
            setPlaceholders([]);

            dispatch(documentActions.fetch());
        }
    }, [documents.preparing]);

    const selectUser = (user, nibss) => {
        setDocument({
            ...document,
            signatories: [
                ...document.signatories,
                {
                    ...user,
                    nibss: nibss ? nibss : false
                }
            ]
        });
    }

    const addRecipient = recipient => {
        setDocument(d => {
            d.recipients.findIndex(rec => rec._id === recipient._id) !== -1 ?
                d.recipients.splice(d.recipients.findIndex(rec => rec._id === recipient._id), 1) :
                d.recipients.push(recipient);

            return {
                ...d
            }
        });
    }

    const onDrop = useCallback(acceptedFiles => {
        var r = new FileReader();

        r.onloadend = function (e) {
            setDocumentFiles(d => [
                ...d,
                e.target.result
            ]);
        }

        r.readAsDataURL(acceptedFiles[0], "UTF-8");

        // Do something with the files
        setDocument(d => ({
            ...d,
            file: acceptedFiles[0]
        }));

        setUploadingDocument(true);
        setModal("");
        setStep(1);
    }, []);

    const prepareDocument = () => {
        dispatch(documentActions.prepare(document, placeholders));
    };

    const fetch = type => {
        setFetching(true);

        dispatch(documentActions.fetch(type ? type : ''));

        if (type) {
            dispatch(push(`/dashboard/documents?type=${type}`));
        } else {
            dispatch(push(`/dashboard/documents`));
        }
    };

    const viewPage = p => {
        if (p <= documents.documents.pagination.number_of_pages && p !== documents.documents.pagination.current) {
            dispatch(push(`/dashboard/documents/${p}`));
        }
    }

    const viewDocument = (d) => {
        dispatch(documentActions.setDocument(d));

        if (d.signed) {
            dispatch(push(`/dashboard/document/${d._id}`));
        } else {
            dispatch(push(`/dashboard/append-signature/${d._id}`));
        }
    }

    const viewStats = (e, d) => {
        e.stopPropagation();
        dispatch(documentActions.setDocument(d));

        dispatch(push(`/dashboard/document/${d._id}`));
    }

    const renderSkipText = () => {
        if (step > 2) {
            return 'PREVIOUS'
        }

        return 'SKIP';
    }

    const renderNextContent = () => {
        if (documents.preparing) {
            return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        }

        return <span>NEXT</span>;
    }

    return (
        <div ref={page} className="full-width full-height custom-scrollbar overflow-auto-y">
            {uploadingDocument ?
                <>
                    {step < 5 &&
                        <BackButton
                            onClick={() => setUploadingDocument(false)}
                            className="cursor-pointer display-flex size-pointnine-rem align-items-center mustard-color left above bold">
                            <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                            BACK
                        </BackButton>}
                    <Container
                        className={`${(step === 3 || step === 4) && documentContainerClass} 
                            ${step === 5 && completeClass} 
                            onboarding 
                            width-80-percent 
                            bottom-padding-80 
                            display-flex 
                            flex-direction-column 
                            align-items-center 
                            margin-auto 
                            top-margin-25 
                            border-box 
                            top-padding-50 
                            white 
                            border-radius-10 
                            box-shadow-less2`}>
                        {step < 5 &&
                            <div className="display-flex align-items-center justify-center no-select">
                                <Step
                                    className={`${step === 1 && activeStepClass} ${documentStepClasses}`}>
                                    1
                                </Step>
                                <StepDelimiter></StepDelimiter>
                                <Step
                                    className={`${step === 2 && activeStepClass} ${documentStepClasses}`}>
                                    2
                                </Step>
                                <StepDelimiter></StepDelimiter>
                                <Step
                                    className={`${step === 3 && activeStepClass} ${documentStepClasses}`}>
                                    3
                                </Step>
                                <StepDelimiter></StepDelimiter>
                                <Step
                                    className={`${step === 4 && activeStepClass} ${documentStepClasses}`}>
                                    4
                                </Step>
                            </div>}
                        {step === 1 &&
                            <SetupSignatories
                                document={document}
                                selectUser={selectUser} />}
                        {step === 2 &&
                            <SetupRecipients
                                document={document}
                                addRecipient={addRecipient}
                            />}
                        {step === 3 &&
                            <SigningSetup
                                signatories={document.signatories}
                                placeholders={placeholders}
                                documentFiles={documentFiles}
                                setPlaceholders={setPlaceholders}
                            />}
                        {step === 4 &&
                            <div className="full-width width-85-percent margin-auto">
                                <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Preview</p>
                                <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Preview the document send it</p>
                                <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>

                                <Gray className="min-height-350 display-flex top-margin-40 border-box bottom-padding-30 padding-10 border-radius-15">
                                    <RTE
                                        onChange={documentBody => setDocument({ ...document, documentBody })} />
                                </Gray>
                                <p className="bottom-margin-20 top-margin-30 size-pointnine-rem bold">Document Attachment</p>
                                {documentFiles &&
                                    documentFiles.map((documentFile, index) =>
                                        <img src={documentFile} key={index} className="height-100 bottom-margin-30" alt="NIBSS Upload Document" />
                                    )}
                            </div>}
                        {step === 5 &&
                            <DocumentCreationSuccessful
                                setUploadingDocument={setUploadingDocument} />}
                        {step < 5 &&
                            <BottomNav
                                className={`height-80 
                                    width-85-percent 
                                    margin-auto 
                                    border-top-gray 
                                    no-shrink 
                                    absolute 
                                    bottom 
                                    above 
                                    display-flex 
                                    align-items-center 
                                    space-between`}>
                                <p
                                    onClick={() => setStep(s => s < 3 ? s + 1 : s - 1)}
                                    className="size-pointnine-rem mustard-color no-select cursor-pointer bold">
                                    {renderSkipText()}
                                </p>
                                <button
                                    onClick={() => { step < 4 ? setStep(s => s + 1) : prepareDocument() }}
                                    className={`left-padding-20 
                                        right-padding-20 
                                        height-40 
                                        mustard 
                                        white-color 
                                        border-radius-2 
                                        display-flex 
                                        justify-center 
                                        align-items-center`}>
                                    {renderNextContent()}
                                </button>
                            </BottomNav>}
                    </Container>
                </>
                :
                <>
                    {modal !== "" &&
                        <ModalContainer closeModal={() => setModal("")}>
                            {modal === "create-document" &&
                                <CreateDocument
                                    onDrop={onDrop}
                                    setModal={setModal}
                                    setStep={setStep}
                                    closeModal={() => setModal("")}
                                    setUploadingDocument={setUploadingDocument} />}
                        </ModalContainer>}
                    <div className="full-width border-box left-padding-30 right-padding-30">
                        <PageTitle
                            title="Documents"
                        />
                        <Tabs className="height-60 full-width display-flex no-select">
                            <Tab
                                onClick={() => {
                                    fetch();
                                    setTab(1)
                                }}
                                className={`${tab === 1 && activeTabClass} ${tabClasses}`}>
                                All Documents {renderTabStats(1, 'total_documents', true)}
                                <div className="full-width height-0 smooth"></div>
                            </Tab>
                            <Tab onClick={() => {
                                fetch("pending");
                                setTab(2)
                            }}
                                className={`${tab === 2 && activeTabClass} ${tabClasses}`}>
                                Pending Documents {renderTabStats(2, 'pending_document')}
                                <div className="full-width height-0 smooth"></div>
                            </Tab>
                            <Tab
                                onClick={() => {
                                    fetch("signed");
                                    setTab(3)
                                }}
                                className={`${tab === 3 && activeTabClass} ${tabClasses}`}>
                                Signed Documents {renderTabStats(3, 'signed_document')}
                                <div className="full-width height-0 smooth"></div>
                            </Tab>
                            <Tab
                                onClick={() => {
                                    fetch("rejected");
                                    setTab(4)
                                }}
                                className={`${tab === 4 && activeTabClass} ${tabClasses}`}>
                                Rejected Documents {renderTabStats(4, 'rejected_document')}
                                <div className="full-width height-0 smooth"></div>
                            </Tab>
                        </Tabs>
                        <UploadButton
                            onClick={() => setModal("create-document")}
                            className={`cursor-pointer 
                                top-margin-30 
                                bottom-margin-20 
                                full-width 
                                height-60 
                                display-flex 
                                align-items-center 
                                justify-center 
                                size-pointeight-rem 
                                bold`}>
                            <img src={require(`images/icons/dashboard/upload.svg`)} className="height-20 right-margin-10" alt="NIBSS Upload Document" />
                            Upload a document
                        </UploadButton>
                        <DocumentList
                            page={page}
                            viewPage={viewPage}
                            documents={documents}
                            fetching={fetching}
                            viewDocument={viewDocument}
                            viewStats={viewStats}
                            tab={tab} />
                    </div>
                </>}
        </div>
    )
});

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

const Step = styled.div`
                        border: 1px solid rgba(145, 154, 163, 0.2);
                        background: #FFF;
                        color: #919AA3;
                        &.active-step {
                            background: #9E7D0A;
                            color: #FFF
                        }
                    `;

const StepDelimiter = styled.div`
                        height: 2px;
                        width: 25px;
                        background: #919AA3;
                        margin-left: 7px;
                        margin-right: 7px;
                        border-radius: 2px;
                        opacity: 0.5;
                    `;

const Container = styled.div`
                        height: calc(100% - 110px);
                        & input {
                            border-width: 1px !important;
                        }
                        &.complete {
                            min-height: 100px !important;
                            height: 60% !important;
                            margin-top: 10% !important;
                            width: 70% !important;
                        }
                    `;

const BottomNav = styled.div`
                        left: calc(15% / 2);
                    `;

const Gray = styled.div`
                        background: #F8F8F8;
                    `;

const BackButton = styled.div`
                            width: 200px;
                            left: 10%;
                            margin-top: 30px;
                            &:hover span {
                                margin-right: 10px;
                            }
                        `;

export default Documents;
