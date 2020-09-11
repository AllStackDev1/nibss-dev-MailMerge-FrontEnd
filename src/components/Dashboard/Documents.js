import React, { useState } from "react"
import styled from "styled-components"
import Document from "./snippets/Document";
import Pagination from "./snippets/Pagination";
import PageTitle from "./snippets/PageTitle";
import ModalContainer from "./modals/ModalContainer";
import CreateDocument from "./modals/CreateDocument";
import DocumentCreationSuccessful from "./snippets/documents/DocumentCreationSuccessful";

const Documents = () => {
    const [tab, setTab] = useState(1);
    const [step, setStep] = useState(1);
    const [uploadingDocument, setUploadingDocument] = useState(false);
    const [modal, setModal] = useState(false);

    return (
        uploadingDocument ?
            <>
                {step < 5 ?
                    <BackButton onClick={() => setUploadingDocument(false)} className="cursor-pointer display-flex size-pointnine-rem align-items-center mustard-color left above bold">
                        <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                        BACK
                    </BackButton>
                    : ""}
                <Container className={`${step === 3 ? 'height-auto bottom-margin-50' : ''} ${step === 5 ? "complete" : ""} onboarding width-80-percent bottom-padding-80 display-flex flex-direction-column align-items-center margin-auto top-margin-25 border-box top-padding-50 white border-radius-10 box-shadow-less2`}>
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
                        <>
                            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Setup Signatories</p>
                            <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Tell us who is signing this documents</p>
                            <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>
                            <div className="display-flex full-height overflow-hidden width-85-percent top-margin-40 border-box">
                                <div className="width-50-percent border-box left-padding-10 overflow-auto-y custom-scrollbar border-right-gray-1 right-padding-60">
                                    <p className="size-pointnine-rem bold bottom-margin-20">NIBSS members</p>
                                    <form>
                                        <input type="text" name="name" placeholder="Full Name" className="height-50" required />
                                        <DocumentButton type="submit" className="width-90 height-35 top-margin-15 box-shadow-less2 border-radius-5 display-flex align-items-center justify-center">
                                            <span className="mustard-color bold size-pointeightfive-rem">ADD</span>
                                        </DocumentButton>
                                    </form>
                                </div>
                                <div className="width-50-percent right-padding-10 overflow-auto-y custom-scrollbar left-padding-60 border-box">
                                    <p className="size-pointnine-rem bold bottom-margin-20">External members</p>
                                    <form>
                                        <input type="text" name="name" placeholder="Full Name" className="height-50 bottom-margin-10" required />
                                        <input type="email" name="email" placeholder="Email address" className="height-50" required />
                                        <DocumentButton type="submit" className="width-90 height-35 top-margin-15 box-shadow-less2 border-radius-5 display-flex align-items-center justify-center">
                                            <span className="mustard-color bold size-pointeightfive-rem">ADD</span>
                                        </DocumentButton>
                                    </form>
                                </div>
                            </div>
                        </>
                        : ""}
                    {step === 2 ?
                        <>
                            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Select Recipients</p>
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
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests" className="checkbox-s" />
                                    <label htmlFor="charter-requests" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests2" className="checkbox-s" />
                                    <label htmlFor="charter-requests2" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests3" className="checkbox-s" />
                                    <label htmlFor="charter-requests3" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests4" className="checkbox-s" />
                                    <label htmlFor="charter-requests4" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests5" className="checkbox-s" />
                                    <label htmlFor="charter-requests5" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests6" className="checkbox-s" />
                                    <label htmlFor="charter-requests6" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests7" className="checkbox-s" />
                                    <label htmlFor="charter-requests7" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests8" className="checkbox-s" />
                                    <label htmlFor="charter-requests8" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                                    <input type="checkbox" id="charter-requests9" className="checkbox-s" />
                                    <label htmlFor="charter-requests9" className="no-shrink"></label>
                                    <Profile url={require(`images/icons/dashboard/profile.png`)} className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent left-margin-20"></Profile>
                                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                                        Oluwatobi Amusan
                                    </div>
                                    <div className="no-shrink width-30-percent size-pointeight-rem">
                                        <p className="size-pointeight-rem light-gray-color truncate">amusantobi@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </>
                        : ""}
                    {step === 3 ?
                        <>
                            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Signing Setup</p>
                            <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Tell us who is signing this documents</p>
                            <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>

                            <div className="full-height display-flex width-85-percent top-margin-40 border-box bottom-padding-30">
                                <div className="width-75-percent right-margin-50">
                                    <img src={require(`images/document.svg`)} className="full-width right-margin-10" alt="NIBSS Upload Document" />
                                </div>
                                <div className="width-25-percent">
                                    <div className="display-flex align-items-center">
                                        <div className="width-40 height-40 display-flex align-items-center">
                                            <img src={require(`images/icons/document/signature.svg`)} className="height-18 right-margin-20" alt="NIBSS Signature" />
                                        </div>
                                        <span className="size-pointeight-rem">Signature</span>
                                    </div>
                                    <div className="display-flex align-items-center">
                                        <div className="width-40 height-40 display-flex align-items-center">
                                            <img src={require(`images/icons/document/date.svg`)} className="height-18 right-margin-20" alt="NIBSS Date" />
                                        </div>
                                        <span className="size-pointeight-rem">Date Stamp</span>
                                    </div>
                                    <div className="display-flex align-items-center bottom-margin-70">
                                        <div className="width-40 height-40 display-flex align-items-center">
                                            <img src={require(`images/icons/document/initials.svg`)} className="height-18 right-margin-20" alt="NIBSS Initials" />
                                        </div>
                                        <span className="size-pointeight-rem">Initials</span>
                                    </div>
                                    <p className="size-pointeight-rem bold">Assigned To</p>
                                    <Assignees className="top-margin-10">
                                        <div className="display-flex align-items-center bottom-margin-10">
                                            <Blue className="height-20 width-20 right-margin-10"></Blue>
                                            <p className="size-pointseven-rem">Lois Genesis</p>
                                        </div>
                                        <div className="display-flex align-items-center">
                                            <Orange className="height-20 width-20 right-margin-10"></Orange>
                                            <p className="size-pointseven-rem">Rulo Digital</p>
                                        </div>
                                    </Assignees>
                                </div>
                            </div>
                        </>
                        : ""}
                    {step === 4 ?
                        <>
                            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Preview</p>
                            <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Preview the document send it</p>
                            <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>

                            <div className="full-height display-flex width-85-percent top-margin-40 border-box bottom-padding-30">

                            </div>
                        </>
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
                            <button onClick={() => setStep(step => step + 1)} className="left-padding-20 right-padding-20 height-40 mustard white-color border-radius-2 display-flex justify-center align-items-center">
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
                                setModal={setModal}
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
            </>
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

const DocumentButton = styled.button`
                        min-width: 50px;
                    `;

const BottomNav = styled.div`
                        left: calc(15% / 2);
                    `;

const Assignees = styled.div`
                        background: #FAF8F3;
                        padding: 15px;
                    `;

const Blue = styled.div`background: #99FEF8;`;

const Orange = styled.div`background: #FFB81C;`;

const BackButton = styled.div`
                            width: 200px;
                            left: 10%;
                            margin-top: 30px;
                            &:hover span {
                                margin-right: 10px;
                            }
                        `;

const Profile = styled.div`background-image: url(${props => props.url});
                        background-position: center;
                        background-size: cover;`;

export default Documents;