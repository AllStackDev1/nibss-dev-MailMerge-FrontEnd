import React, { useState, useCallback, useRef } from "react"
import styled from "styled-components"
import PageTitle from "./snippets/PageTitle";
import ModalContainer from "./modals/ModalContainer";
import CreateDocument from "./modals/CreateDocument";
import DocumentCreationSuccessful from "./snippets/documents/DocumentCreationSuccessful";
import SetupSignatories from "./snippets/documents/SetupSignatories";
import SetupRecipients from "./snippets/documents/SetupRecipients";
import SigningSetup from "./snippets/documents/SigningSetup";
import RTE from "./snippets/documents/Preview";
import { useDispatch } from "react-redux";
import { documentActions } from "actions/documentActions";
import DocumentList from "./snippets/documents/DocumentList";
import { useParams } from "react-router-dom";

const Documents = () => {
    const [document, setDocument] = useState({
        signatories: [],
        recipients: []
    });
    const [tab, setTab] = useState(1);
    const [step, setStep] = useState(1);
    const [uploadingDocument, setUploadingDocument] = useState(false);
    const [modal, setModal] = useState(false);
    const [placeholders, setPlaceholders] = useState([]);

    const dispatch = useDispatch();
    const page = useRef(null);
    let { pageId } = useParams();

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
        setDocument(document => {
            document.recipients.findIndex(rec => rec._id === recipient._id) !== -1 ? document.recipients.splice(document.recipients.findIndex(rec => rec._id === recipient._id), 1) : document.recipients.push(recipient);

            return {
                ...document
            }
        });
    }

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setDocument(document => ({
            ...document,
            file: acceptedFiles[0]
        }));

        setUploadingDocument(true);
        setModal(false);
        setStep(1);
    }, []);

    const prepareDocument = () => {
        dispatch(documentActions.prepare(document));
    };

    return (
        <div ref={page} className="full-width full-height custom-scrollbar overflow-auto-y">
            {uploadingDocument ?
                <>
                    {step < 5 ?
                        <BackButton onClick={() => setUploadingDocument(false)} className="cursor-pointer display-flex size-pointnine-rem align-items-center mustard-color left above bold">
                            <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                        BACK
                    </BackButton>
                        : ""}
                    <Container className={`${step === 3 || step === 4 ? 'height-auto bottom-margin-50' : ''} ${step === 5 ? "complete" : ""} onboarding width-80-percent bottom-padding-80 display-flex flex-direction-column align-items-center margin-auto top-margin-25 border-box top-padding-50 white border-radius-10 box-shadow-less2`}>
                        {step < 5 ?
                            <div className="display-flex align-items-center justify-center no-select">
                                <Step className={`${step === 1 ? 'active-step' : ''} smooth height-35 width-35 display-flex align-items-center justify-center border-radius-100-percent`}>
                                    1
                            </Step>
                                <StepDelimiter></StepDelimiter>
                                <Step className={`${step === 2 ? 'active-step' : ''} smooth height-35 width-35 display-flex align-items-center justify-center border-radius-100-percent`}>
                                    2
                            </Step>
                                <StepDelimiter></StepDelimiter>
                                <Step className={`${step === 3 ? 'active-step' : ''} smooth height-35 width-35 display-flex align-items-center justify-center border-radius-100-percent`}>
                                    3
                            </Step>
                                <StepDelimiter></StepDelimiter>
                                <Step className={`${step === 4 ? 'active-step' : ''} smooth height-35 width-35 display-flex align-items-center justify-center border-radius-100-percent`}>
                                    4
                            </Step>
                            </div>
                            : ""}
                        {step === 1 ?
                            <SetupSignatories
                                document={document}
                                selectUser={selectUser} />
                            : ""}
                        {step === 2 ?
                            <SetupRecipients
                                document={document}
                                addRecipient={addRecipient}
                            />
                            : ""}
                        {step === 3 ?
                            <SigningSetup
                                signatories={document.signatories}
                                placeholders={placeholders}
                                setPlaceholders={setPlaceholders}
                            />
                            : ""}
                        {step === 4 ?
                            <div className="full-width width-85-percent margin-auto">
                                <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Preview</p>
                                <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Preview the document send it</p>
                                <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>

                                <Gray className="min-height-350 display-flex top-margin-40 border-box bottom-padding-30 padding-10 border-radius-15">
                                    <RTE
                                        onChange={documentBody => setDocument({ ...document, documentBody })} />
                                </Gray>
                                <p className="bottom-margin-20 top-margin-30 size-pointnine-rem bold">Document Attachment</p>
                                <img src={require(`images/document.svg`)} className="height-100 bottom-margin-30" alt="NIBSS Upload Document" />
                            </div>
                            : ""}
                        {step === 5 ?
                            <DocumentCreationSuccessful
                                setUploadingDocument={setUploadingDocument} />
                            : ""}
                        {step < 5 ?
                            <BottomNav className="height-80 width-85-percent margin-auto border-top-gray no-shrink absolute bottom above display-flex align-items-center space-between">
                                <p onClick={() => setStep(step => step < 3 ? step + 1 : step - 1)} className="size-pointnine-rem mustard-color no-select cursor-pointer bold">
                                    {step > 2 ? 'PREVIOUS' : 'SKIP'}
                                </p>
                                <button onClick={() => { step < 4 ? setStep(step => step + 1) : prepareDocument() }} className="left-padding-20 right-padding-20 height-40 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                                    {/* <div className="lds-ring"><div></div><div></div><div></div><div></div></div> */}
                                NEXT
                            </button>
                            </BottomNav>
                            : ""}
                    </Container>
                </>
                :
                <>
                    {modal !== false ?
                        <ModalContainer closeModal={() => setModal(false)}>
                            {modal === "create-document" ?
                                <CreateDocument
                                    onDrop={onDrop}
                                    setModal={setModal}
                                    setStep={setStep}
                                    closeModal={() => setModal(false)}
                                    setUploadingDocument={setUploadingDocument} />
                                : ""}
                        </ModalContainer>
                        : ""}
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
                        <UploadButton onClick={() => setModal("create-document")} className="cursor-pointer top-margin-30 bottom-margin-20 full-width height-60 display-flex align-items-center justify-center size-pointeight-rem bold">
                            <img src={require(`images/icons/dashboard/upload.svg`)} className="height-20 right-margin-10" alt="NIBSS Upload Document" />
                            Upload a document
                        </UploadButton>
                        <DocumentList
                            page={page}
                            pageId={pageId} />
                    </div>
                </>}
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