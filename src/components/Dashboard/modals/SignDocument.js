import React, { useRef, useState } from 'react';
import styled from "styled-components";
import SignatureCanvas from 'react-signature-canvas'

const SignDocument = ({ user, signingDocument, documentSignature, setDocumentSignature, signDocument, editRecipient, recipient, onChange, onChangeEdit, onSubmit, creating }) => {
    const [signatureType, setSignatureType] = useState("draw");
    const [legal, setLegal] = useState({ legal: false });
    const [signature, setSignature] = useState({ signature: "" });

    const signatureCanvas = useRef(null);

    const clearCanvas = () => {
        signatureCanvas.current.clear();
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
                <div className="action-modal no-select white full-width border-box left-padding-50 right-padding-50 bottom-padding-50 border-radius-10 top-padding-50 bottom-margin-50">
                    <div className="width-70-percent margin-auto display-flex">
                        <div onClick={() => { setSignatureType("draw"); setSignature({ signature: "" }) }} className={`${signatureType === "draw" ? 'border-gray' : 'opacity-0-5'} smooth border-box width-50-percent no-select cursor-pointer height-80 border-radius-7 gray right-margin-30 display-flex flex-direction-column align-items-center justify-center`}>
                            <img src={require(`images/icons/draw-signature.svg`)} className="height-25" alt="Invite users" />
                            <p className="bold size-pointeightfive-rem top-margin-10">Draw Signature</p>
                        </div>
                        <div onClick={() => { setSignatureType("write"); signatureCanvas.current.clear(); }} className={`${signatureType === "write" ? 'border-gray' : 'opacity-0-5'} smooth border-box width-50-percent no-select cursor-pointer height-80 border-radius-7 gray display-flex flex-direction-column align-items-center justify-center`}>
                            <img src={require(`images/icons/write-signature.svg`)} className="height-25" alt="Invite users" />
                            <p className="bold size-pointeightfive-rem top-margin-10">Write Signature</p>
                        </div>
                    </div>
                    <div>
                        <div className={`${signatureType === 'write' ? 'hide' : ''} display-flex flex-direction-column cursor-pointer no-select justify-center`}>
                            <SignatureCanvas ref={signatureCanvas} penColor='green'
                                canvasProps={{ width: 600, height: 180, className: 'gray top-margin-30 margin-auto' }} />
                            <div onClick={() => clearCanvas()} className="display-inline-flex margin-auto top-margin-20 align-items-center red-color bold">
                                <img src={require(`images/icons/undo.svg`)} className="height-10 right-margin-10" alt="Invite users" />
                                undo
                            </div>
                        </div>
                        <input type="text" name="signature" value={signature.signature} onChange={e => setSignature({ signature: e.target.value })} placeholder="Type here" className={`${signatureType === 'draw' ? 'hide' : ''} text-center top-margin-30 height-200 gray width-600 size-three-rem`} required />
                        <div className="display-flex flex-wrap top-margin-20">
                            {user?.data?.signatures?.map((signature, index) =>
                                <SignatureContainer onClick={() => setDocumentSignature(s => s !== signature ? signature : "")} url={signature} className={`${documentSignature === signature ? 'active-signature' : ''} display-flex align-items-center justify-center`}>
                                    <div className="width-80-percent height-60-percent"></div>
                                </SignatureContainer>
                            ) || ""}
                        </div>
                    </div>
                    <div className="display-flex top-margin-20 align-items-center space-between">
                        <div className="display-flex align-items-center">
                            <input type="checkbox" name="legal" id={`legal`} onChange={e => setLegal({legal: e.target.checked})} className="checkbox-s" />
                            <label htmlFor={`legal`} className="no-shrink absolute left center-item-vertically"></label>
                            <label htmlFor={`legal`} className="left-padding-50 size-pointeight-rem">
                                I understand this is a legal representation of my signature.
                            </label>
                        </div>
                        <button onClick={signDocument} disabled={documentSignature === "" || legal.legal === false} className="left-margin-50 no-shrink left-padding-20 right-padding-20 height-40 mustard white-color border-radius-2 display-flex justify-center align-items-center">
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