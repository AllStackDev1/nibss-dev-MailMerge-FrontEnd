import React, { useState } from 'react';
import styled from "styled-components";
import SignatureCanvas from 'react-signature-canvas'
import SignatureOption from '../snippets/documents/SignatureOption';

const SignDocument = ({
    signatureType,
    setSignatureType,
    uploadSignatureFile,
    signature,
    setSignature,
    signatureCanvas,
    user,
    signingDocument,
    documentSignature,
    setDocumentSignature,
    signDocument }) => {
    const [legal, setLegal] = useState({ legal: false });
    const [signatureSource, setSignatureSource] = useState("saved");

    const clearCanvas = () => {
        signatureCanvas.current.clear();
    }

    const optionBtnStyle = `no-shrink 
    left-padding-20 
    right-padding-20 
    height-40 
    white 
    mustard-color 
    border-mustard 
    border-width-2 
    border-radius-2 
    display-flex 
    justify-center 
    align-items-center`;

    // RENDER HELPERS
    const renderNew = () => {
        return (
            <>
                <div className="full-width display-flex space-between bottom-margin-50">
                    <div>
                        <p className="size-onepointone-rem bold">New Signature</p>
                        <p className="size-pointnine-rem">Draw or write a new signature</p>
                    </div>
                    <button
                        onClick={() => setSignatureSource("saved")}
                        className={optionBtnStyle} data-test="use-save-btn">
                        USE SAVED SIGNATURE
                    </button>
                </div>
                <div className="margin-auto display-flex justify-center">
                    <SignatureOption
                        label="Draw Signature"
                        signatureType={signatureType}
                        onClick={() => {
                            setSignatureType("draw");
                            setSignature({ signature: "" })
                        }}
                        optionType="draw"
                        image={require(`images/icons/draw-signature.svg`)} data-test="draw-signature" />
                    <SignatureOption
                        label="Write Signature"
                        signatureType={signatureType}
                        onClick={() => {
                            setSignatureType("write");
                            signatureCanvas.current.clear();
                        }}
                        optionType="write"
                        image={require(`images/icons/write-signature.svg`)} data-test="write-signature" />
                    <SignatureOption
                        label="Upload Signature"
                        signatureType={signatureType}
                        onClick={() => {
                            document.getElementById('signature_file').click()
                        }}
                        optionType="upload"
                        icon="cloud_upload" />

                    <input
                        type="file"
                        name="signature_file"
                        id="signature_file"
                        accept="image/*"
                        onChange={uploadSignatureFile}
                        className="width-0 height-0 border-box hide" />
                </div>
                <div>
                    {renderSignatureType(signatureType)}
                </div>
            </>
        );
    }

    const renderSaved = () => {
        return (
            <div className="top-margin-20 min-height-300">
                <div className="full-width display-flex space-between bottom-margin-30">
                    <div>
                        <p className="size-onepointone-rem bold">Saved Signatures</p>
                        <p className="size-pointnine-rem">These are signatures you frequently used</p>
                    </div>
                    <button
                        onClick={() => setSignatureSource("new")}
                        className={optionBtnStyle} data-test="add-new">
                        ADD NEW
                    </button>
                </div>
                <div className="display-flex flex-wrap">
                    {user?.data?.signatures?.map((mapSignature, index) =>
                        <SignatureContainer
                            key={index}
                            onClick={() => setDocumentSignature(s => s !== mapSignature ? mapSignature : "")}
                            url={mapSignature}
                            className={`${documentSignature === mapSignature ? 'active-signature' : ''} display-flex align-items-center justify-center`} data-test="signature-con">
                            <div className="width-80-percent height-60-percent"></div>
                        </SignatureContainer>
                    ) || ""}
                </div>
            </div>
        )
    }

    const renderSignatureType = s => {
        if (s === 'write') {
            return (
                <input
                    type="text"
                    name="signature"
                    value={signature.signature}
                    onChange={e => setSignature({ signature: e.target.value })}
                    placeholder="Type here"
                    className={`text-center top-margin-30 height-200 gray width-600 size-three-rem`} required />
            )
        }

        return (
            <div className={`display-flex flex-direction-column cursor-pointer no-select justify-center`}>
                <SignatureCanvas ref={signatureCanvas} penColor='green'
                    canvasProps={{ width: 600, height: 180, className: 'gray top-margin-30 margin-auto' }} />
                <div onClick={() => clearCanvas()} className="display-inline-flex margin-auto top-margin-20 align-items-center red-color bold">
                    <img src={require(`images/icons/undo.svg`)} className="height-10 right-margin-10" alt="Invite users" />
                    undo
                </div>
            </div>)
    }

    return (
        <div className="full-height full-width overflow-auto-y custom-scrollbar display-flex justify-center top-padding-50">
            <div onClick={e => e.stopPropagation()} className="width-50-percent">
                <div className="display-flex full-width flex-direction-column justify-center bottom-margin-30 text-center">
                    <BackButton className="center-item-vertically cursor-pointer display-flex size-pointseven-rem align-items-center white-color left above">
                        <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                        BACK
                    </BackButton>
                    <p className="white-color bold">Create Signature</p>
                    <p className="white-color size-pointeight-rem">Append signature to document</p>
                </div>
                <div
                    className={`action-modal 
                        no-select 
                        white 
                        full-width 
                        border-box 
                        left-padding-50 
                        right-padding-50 
                        bottom-padding-50 
                        border-radius-10 
                        top-padding-50 
                        bottom-margin-50`}>
                    {signatureSource === "new" && renderNew()}
                    {signatureSource === "saved" && renderSaved()}
                    <div className="display-flex top-margin-20 align-items-center space-between">
                        <div className="display-flex align-items-center">
                            <input type="checkbox" name="legal" id={`legal`} onChange={e => setLegal({ legal: e.target.checked })} className="checkbox-s" />
                            <label htmlFor={`legal`} className="no-shrink absolute left center-item-vertically"></label>
                            <label htmlFor={`legal`} className="left-padding-50 size-pointeight-rem">
                                I understand this is a legal representation of my signature.
                            </label>
                        </div>
                        <button
                            onClick={signDocument}
                            disabled={legal.legal === false || signingDocument}
                            className={`left-margin-50 
                                no-shrink 
                                left-padding-20 
                                right-padding-20 
                                height-40 
                                mustard 
                                white-color 
                                border-radius-2 
                                display-flex 
                                justify-center 
                                align-items-center`}>
                            {signingDocument ?
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                :
                                'INSERT'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const BackButton = styled.div`
                                &:hover span {
                                    margin-right: 10px;
                                }
                            `;

const SignatureContainer = styled.div`
                        width: calc((100% - 30px) / 4);
                        margin-right: 10px;
                        margin-bottom: 10px;
                        height: 80px;
                        background-color: #F5F5F5;
                        border: 3px solid #F5F5F5;
                        box-sizing: border-box;
                        &>div {
                            background-image: url(${props => props.url});
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: contain;
                        }
                        &:nth-of-type(4n) {
                            margin-right: 0;
                        }
                        &.active-signature {
                            border: 3px solid #9E7D0A;
                        }
                    `;

export default SignDocument;
