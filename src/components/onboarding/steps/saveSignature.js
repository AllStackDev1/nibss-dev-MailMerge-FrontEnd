import React, { useState, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

const SaveSignature = () => {
    const [signuatureType, setSignatureType] = useState('draw');
    const signatureCanvas = useRef(null);

    const clearCanvas = () => {
        signatureCanvas.current.clear();
    }

    return (
        <div className="left-padding-80 right-padding-80">
            <p className="size-onepointfive-rem bold bottom-padding-10 text-center">Save your Signature</p>
            <p className="size-pointeight-rem light-gray-color text-center bottom-margin-30">Create and save your signatures</p>
            <div className="height-1 width-150 margin-auto border-top-gray bottom-margin-30"></div>
            <div className="width-70-percent margin-auto top-margin-30 display-flex">
                <div onClick={() => setSignatureType("draw")} className={`${signuatureType === "draw" ? 'border-gray' : 'opacity-0-5'} smooth border-box width-50-percent no-select cursor-pointer height-100 border-radius-7 gray right-margin-30 display-flex flex-direction-column align-items-center justify-center`}>
                    <img src={require(`images/icons/draw-signature.svg`)} className="height-30" alt="Invite users" />
                    <p className="bold size-pointeightfive-rem top-margin-10">Draw Signature</p>
                </div>
                <div onClick={() => setSignatureType("write")} className={`${signuatureType === "write" ? 'border-gray' : 'opacity-0-5'} smooth border-box width-50-percent no-select cursor-pointer height-100 border-radius-7 gray display-flex flex-direction-column align-items-center justify-center`}>
                    <img src={require(`images/icons/write-signature.svg`)} className="height-30" alt="Invite users" />
                    <p className="bold size-pointeightfive-rem top-margin-10">Write Signature</p>
                </div>
            </div>
            <div className="display-flex justify-center">
                {signuatureType === 'draw' ?
                    <div className="display-flex flex-direction-column cursor-pointer no-select justify-center">
                        <SignatureCanvas ref={signatureCanvas} penColor='green'
                            canvasProps={{ width: 600, height: 200, className: 'gray top-margin-30 margin-auto' }} />
                        <div onClick={() => clearCanvas()} className="display-inline-flex margin-auto top-margin-20 align-items-center red-color bold">
                            <img src={require(`images/icons/undo.svg`)} className="height-12 right-margin-10" alt="Invite users" />
                            undo
                        </div>
                    </div>
                    :
                    <input type="text" name="signature" placeholder="Type here" className="text-center top-margin-30 height-200 gray width-600 size-three-rem" required />}
            </div>
        </div>
    )
}

export default SaveSignature;