import React, { useState, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { toFile } from 'helpers/toFile';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from 'actions';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import SignatureOption from 'components/Dashboard/snippets/documents/SignatureOption';

const SaveSignature = ({ add }) => {
    const [signatureType, setSignatureType] = useState('draw');
    const [signature, setSignature] = useState({ signature: "" });
    const signatureCanvas = useRef(null);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const clearCanvas = () => {
        const signatureCanvasCurrent = signatureCanvas.current?.clear()
    }

    const logout = () => {
        dispatch(authActions.logout());
        dispatch(push("/"));
    }

    const saveSignature = () => {
        if (signatureCanvas?.current?.isEmpty() && signature.signature === "") {
            toast.warning("Please sign to proceed");
        } else {
            let signatureImage;

            if (signatureType === "draw") {
                signatureImage = signatureCanvas.current?.getTrimmedCanvas().toDataURL('image/svg');
            } else {
                var style = {
                    font: 'Poppins',
                    align: 'center',
                    color: 'black',
                    size: 30,
                    background: 'transparent',
                    stroke: 1,
                    strokeColor: 'rgba(0, 0, 0, 1)'
                };

                var textImage = window.TextImage(style);
                signatureImage = textImage.toDataURL(signature.signature);
            }

            dispatch(authActions.saveSignature(toFile(signatureImage, `signature${Date.now()}.svg`), add));
        }
    }

    const uploadSignatureFile = file => {
        dispatch(authActions.saveSignature(file.target.files[0], add));
    }

    const renderUploadProgress = () => {
        if (!auth?.uploading) {
            return <span>SAVE</span>;
        }

        if (auth.uploadProgress) {
            return <span>{`${auth.uploadProgress}%`}</span>
        } else {
            return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        }
    }

    return (
        <>
            <div className="left-padding-80 right-padding-80">
                <p className="size-onepointfive-rem bold bottom-padding-10 text-center">Save your Signature</p>
                <p className="size-pointeight-rem light-gray-color text-center bottom-margin-30">Create and save your signatures</p>
                <div className="height-1 width-150 margin-auto border-top-gray bottom-margin-30"></div>
                <div className="width-70-percent margin-auto top-margin-30 display-flex">
                    <SignatureOption
                        label="Draw Signature"
                        signatureType={signatureType}
                        onClick={() => {
                            setSignatureType("draw");
                            setSignature({ signature: "" })
                        }}
                        optionType="draw"
                        image={require(`images/icons/draw-signature.svg`)} />
                    <SignatureOption
                        label="Write Signature"
                        signatureType={signatureType}
                        onClick={() => {
                            setSignatureType("write");
                            signatureCanvas.current?.clear()
                        }}
                        optionType="write"
                        image={require(`images/icons/write-signature.svg`)} />
                    <SignatureOption
                        label="Upload Signature"
                        signatureType={signatureType}
                        onClick={() => {
                            document.getElementById('signature_file').click()
                        }}
                        optionType="upload"
                        icon="cloud_upload" />

                    <input type="file" name="signature_file" id="signature_file" accept="image/*" onChange={uploadSignatureFile} className="width-0 height-0 border-box hide" />
                </div>
                <div className="display-flex justify-center">
                    <div className={`${signatureType === 'write' ? 'hide' : ''} display-flex flex-direction-column cursor-pointer no-select justify-center`}>
                        <SignatureCanvas ref={signatureCanvas} penColor='green'
                            canvasProps={{ width: 600, height: 200, className: 'gray top-margin-30 margin-auto' }} />
                        <div onClick={() => clearCanvas()} className="display-inline-flex margin-auto top-margin-20 align-items-center red-color bold">
                            <img src={require(`images/icons/undo.svg`)} className="height-12 right-margin-10" alt="Invite users" />
                            undo
                        </div>
                    </div>
                    <input
                        type="text"
                        name="signature"
                        value={signature.signature}
                        onChange={e => setSignature({ signature: e.target.value })}
                        placeholder="Type here"
                        className={`${signatureType === 'draw' ? 'hide' : ''} text-center top-margin-30 height-200 gray width-600 size-three-rem`}
                        required />
                </div>
            </div>
            <div
                className={`height-80 
                    white 
                    full-width 
                    absolute 
                    bottom 
                    border-top-lightgray 
                    left-padding-80 
                    right-padding-60 
                    border-box 
                    display-flex 
                    align-items-center 
                    space-between`}>
                <p onClick={logout} className="mustard-color size-pointeight-rem bold cursor-pointer">LOGOUT</p>
                <button
                    onClick={saveSignature}
                    disabled={auth?.uploading}
                    className="left-padding-30 right-padding-30 height-45 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                    {renderUploadProgress()}
                </button>
            </div>
        </>
    )
}

export default SaveSignature;
