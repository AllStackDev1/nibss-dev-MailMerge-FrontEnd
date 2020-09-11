import React from 'react';
import styled from "styled-components";

const CreateDocument = ({ tag, onChange, onSubmit, creating, setUploadingDocument, setModal }) => {
    return (
        <div onClick={e => e.stopPropagation()} className="width-40-percent">
            <div className="display-flex full-width flex-direction-column justify-center bottom-margin-30 text-center">
                <BackButton className="center-item-vertically cursor-pointer display-flex size-pointseven-rem align-items-center white-color left above">
                    <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                    BACK
                </BackButton>
                <p className="white-color bold">Upload Document</p>
                <p className="white-color size-pointeight-rem">Create and save your signature</p>
            </div>
            <div className="action-modal no-select white full-width border-box padding-30 border-radius-10">
                <Container url={require(`images/document-bg.svg`)} className="full-width full-height">
                    <Gray className="text-center size-pointeight-rem">
                        Drag and drop documents directly from your computer.<br />
                        You can upload multiple .pdf, .doc, .docx, .jpg, .jpeg, .png, .csv, .xls, .xlsx, .xlsm, .txt
                    </Gray>
                    <button onClick={() => {setUploadingDocument(true); setModal(false);}} type="button" className="margin-auto top-margin-30 width-200 no-border left-padding-30 right-padding-30 border-box mustard height-45 cursor-pointer white-color size-pointeight-rem bold display-flex align-items-center justify-center">
                        CHOOSE FILE
                    </button>
                </Container>
            </div>
        </div>
    );
}

const BackButton = styled.div`
                                &:hover span {
                                    margin-right: 10px;
                                }
                            `;

const Gray = styled.p`color: #919AA3;`;

const Container = styled.div`
                            border: 1px dashed #9E7D0A;
                            padding: 40px;
                            padding-top: 70px !important;
                            padding-bottom: 70px !important;
                            box-sizing: border-box;
                            
                            background-image: url(${props => props.url});
                            background-position: bottom center;
                            background-size: 90% auto;
                            background-repeat: no-repeat;
                        `;



export default CreateDocument;