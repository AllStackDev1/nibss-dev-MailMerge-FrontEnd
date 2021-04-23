import { documentActions } from "actions/documentActions";
import { toFile } from "helpers";
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ModalContainer from "./modals/ModalContainer";
import SignDocument from "./modals/SignDocument";
import { toast } from "react-toastify";
import AppendSignatureDocument from "./snippets/AppendSignatureDocument";
import AppendSignatureImage from "./snippets/AppendSignatureImage";
import decode from 'jwt-decode';

const AppendSignature = ({ user, documentId: urlDocumentId, userToken }) => {
    const [document, setDocument] = useState({});
    const [numPages, setNumPages] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [documentSignature, setDocumentSignature] = useState("");
    const [signature, setSignature] = useState({ signature: "" });
    const [signatureType, setSignatureType] = useState("draw");

    const [modal, setModal] = useState("");
    const documents = useSelector(state => state.document);
    const signDocumentConst = "sign-document";
    const width75percent = "width-75-percent";

    const { documentId } = useParams();
    const dispatch = useDispatch();
    const documentContainer = useRef(null);
    const signatureCanvas = useRef(null);
    const refs = useRef([React.createRef(), React.createRef()]);
    const refsFull = useRef([React.createRef(), React.createRef()]);

    // update document information
    useEffect(() => {
        function setDocumentData(d) {
            setDocument(d);
        }
        if (document._id === undefined) {
            if (documents?.document) {
                if (JSON.stringify(documents.document) !== JSON.stringify(document)) {
                    setDocumentData(documents.document);
                }
            } else {
                if (documents?.fetchingSingle === false) {
                    dispatch(documentActions.fetchSingle(urlDocumentId ? urlDocumentId : documentId, userToken));
                }
            }
        }
    });

    // handle signing of document
    const signDocument = () => {
        if (signatureCanvas?.current?.isEmpty() && signature.signature === "" && documentSignature === "") {
            toast.warning("Please sign to proceed");
        } else {
            if (signatureCanvas?.current?.isEmpty() === false || signature.signature !== "") {
                let signatureImage;
                if (signatureType === "draw") {
                    signatureImage = signatureCanvas.current.getTrimmedCanvas().toDataURL('image/svg');
                } else {
                    var style = {
                        font: 'Poppins', align: 'center', color: 'black', size: 30, background: 'transparent', stroke: 1, strokeColor: 'rgba(0, 0, 0, 1)'
                    };

                    var textImage = window.TextImage(style);
                    signatureImage = textImage.toDataURL(signature.signature);
                }
                dispatch(documentActions.signDocumentNew(toFile(signatureImage, `signature${Date.now()}.svg`), document.document._id, userToken));
            } else {
                dispatch(documentActions.signDocument({
                    documentId: document.document._id,
                    signature: documentSignature
                }, userToken));
            }
        }
    }

    // upload signature file
    const uploadSignatureFile = file => {
        dispatch(documentActions.signDocumentNew(file.target.files[0], document.document._id, userToken));
    }

    const renderModals = () => {
        if (modal === signDocumentConst) {
            return <SignDocument user={user || decode(userToken)} setModal={setModal} closeModal={() => setModal("")} signingDocument={documents.signingDocument}
                documentSignature={documentSignature} setDocumentSignature={setDocumentSignature} signatureCanvas={signatureCanvas} signature={signature}
                setSignature={setSignature} signatureType={signatureType} setSignatureType={setSignatureType} signDocument={signDocument}
                uploadSignatureFile={uploadSignatureFile} />;
        }
        return <div></div>;
    }

    // display signature to user
    const renderSignatureInterface = () => {
        const isNumPagesSet = numPages === undefined;

        if (imageError === false) {
            return <AppendSignatureImage
                imageRef={documentContainer}
                isNumPagesSet={isNumPagesSet}
                width75percent={width75percent}
                setImageError={setImageError}
                setDocument={setDocument}
                document={document}
                user={user}
                userToken={userToken}
                signDocumentConst={signDocumentConst}
                setModal={setModal}
            />
        }

        return <>
            <AppendSignatureDocument
                document={document}
                signDocumentConst={signDocumentConst}
                file={document.document.file}
                pageWidth={700}
                docRef={refs}
                refs={refs}
                refsFull={refsFull}
                signatories={document.document.signatories
                    .filter(signatory => signatory.email === (user?.data?.email || decode(userToken)?.data?.email))}
                isNumPagesSet={isNumPagesSet}
                width75percent={width75percent}
                setDocument={setDocument}
                setNumPages={setNumPages}
                user={user}
                userToken={userToken}
                setModal={setModal}
            />
            <div className="hide height-0 overflow-hidden">
                <AppendSignatureDocument
                    document={document}
                    signDocumentConst={signDocumentConst}
                    file={document.document.file}
                    docRef={refsFull}
                    refs={refs}
                    refsFull={refsFull}
                    isNumPagesSet={isNumPagesSet}
                    width75percent={width75percent}
                    setDocument={setDocument}
                    setNumPages={setNumPages}
                    user={user}
                    userToken={userToken}
                />
            </div>
        </>
    }

    return (
        <>
            {modal !== "" && <ModalContainer closeModal={() => setModal("")}>{renderModals()}</ModalContainer>}
            <div className={`full-width full-height overflow-scroll-y custom-scrollbar`} data-test="component-append-signature">
                <div
                    className={`onboarding display-flex flex-direction-column align-items-center bottom-padding-50 smooth overflow-hidden 
                        width-70-percent margin-auto top-margin-70 bottom-margin-5-percent border-box top-padding-50 white border-radius-10 box-shadow-less2`}>
                    {!document.document ?
                        <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>
                        :
                        <>
                            <b className="size-pointnine-rem">Sign this document</b>
                            <div className="max-width-90-percent top-margin-30">
                                {renderSignatureInterface()}
                            </div>
                        </>}
                </div>
            </div>
        </>
    )
}


const Loader = styled.div`
                    width: 40px;
                    height: 40px;
                    & > div {
                        width: 40px;
                        height: 40px;
                        border-color: #9E7D0A transparent transparent transparent
                    }
                `;

export default AppendSignature;
