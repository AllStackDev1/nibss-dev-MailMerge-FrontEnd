import React from 'react';
import styled from "styled-components";
import { useDropzone } from 'react-dropzone'


// handle new document creation
const CreateDocument = ({ setUploadingDocument, setModal, setStep, onDrop }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div onClick={e => e.stopPropagation()} className="width-40-percent" data-test='create-document-component'>
            <div className="display-flex full-width flex-direction-column justify-center bottom-margin-30 text-center">
                <BackButton className="center-item-vertically cursor-pointer display-flex size-pointseven-rem align-items-center white-color left above">
                    <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                    BACK
                </BackButton>
                <p className="white-color bold">Upload Document</p>
                <p className="white-color size-pointeight-rem">Create and save your signature</p>
            </div>
            <div {...getRootProps()} className="no-outline action-modal no-select white full-width border-box padding-30 border-radius-10">
                <input {...getInputProps()} />
                {isDragActive ?
                    <div className="opacity-0-8 full-width full-height white absolute left top display-flex align-items-center justify-center above border-radius-10">
                        Drop image here
                    </div>
                    : ""
                }
                <Container url={require(`images/document-bg.svg`)} className="full-width full-height">
                    <Gray className="text-center size-pointeight-rem">
                        Drag and drop documents directly from your computer.<br />
                        You can upload multiple .pdf, .doc, .docx, .jpg, .jpeg, .png, .csv, .xls, .xlsx, .xlsm, .txt
                    </Gray>
                    <button
                        type="button"
                        className={`margin-auto 
                            top-margin-30 
                            width-200 
                            no-border 
                            left-padding-30 
                            right-padding-30 
                            border-box 
                            mustard 
                            height-45 
                            cursor-pointer 
                            white-color 
                            size-pointeight-rem 
                            bold 
                            display-flex 
                            align-items-center 
                            justify-center`}>
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
