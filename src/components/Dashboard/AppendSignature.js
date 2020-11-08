import { documentActions } from "actions/documentActions";
import { getImageSize, toFile } from "helpers";
import { getColor } from "helpers/getColor";
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ModalContainer from "./modals/ModalContainer";
import SignDocument from "./modals/SignDocument";
import decode from 'jwt-decode';
import { Document, Page, pdfjs } from "react-pdf";
import { toast } from "react-toastify";
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const AppendSignature = ({ user, documentId: urlDocumentId, userToken }) => {
    const [document, setDocument] = useState({});
    const [numPages, setNumPages] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [documentSignature, setDocumentSignature] = useState("");
    const [signature, setSignature] = useState({ signature: "" });
    const [signatureType, setSignatureType] = useState("draw");

    const [modal, setModal] = useState(false);
    const documents = useSelector(state => state.document);

    const { documentId } = useParams();
    const dispatch = useDispatch();
    const documentContainer = useRef(null);
    const signatureCanvas = useRef(null);
    const refs = useRef([React.createRef(), React.createRef()]);
    const refsFull = useRef([React.createRef(), React.createRef()]);

    function onDocumentLoadSuccess({ numPs }) {
        setNumPages(numPs);
        refs.current = refs.current.splice(0, numPs);
        for (let i = 0; i < numPs; i++) {
            refs.current[i] = refs.current[i] || React.createRef();
        }
        refs.current = refs.current.map((item) => item || React.createRef());

        refsFull.current = refsFull.current.splice(0, numPs);
        for (let i = 0; i < numPs; i++) {
            refsFull.current[i] = refsFull.current[i] || React.createRef();
        }
        refsFull.current = refsFull.current.map((item) => item || React.createRef());

        setTimeout(calculateOffsetPDF, 1000);
    }

    useEffect(() => {
        function setDocumentData(document) {
            setDocument(document);
        }

        if (document._id === undefined) {
            if (documents.document) {
                if (JSON.stringify(documents.document) !== JSON.stringify(document)) {
                    setDocumentData(documents.document);
                }
            } else {
                if (documents.fetchingSingle === false) {
                    console.log("Fetching single document");
                    dispatch(documentActions.fetchSingle(urlDocumentId ? urlDocumentId : documentId, userToken));
                }
            }
        }
    });

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

                dispatch(documentActions.signDocumentNew(toFile(signatureImage, `signature${Date.now()}.svg`), document.document._id, userToken));
            } else {
                dispatch(documentActions.signDocument({
                    documentId: document.document._id,
                    signature: documentSignature
                }, userToken));
            }
        }
    }

    const calculateOffset = async e => {
        let imageSize = await getImageSize(e.target);

        document.document.signatories.forEach((signatory, i) => {
            const documentCopy = Object.assign({}, document);

            documentCopy.document.signatories[i] = {
                ...signatory,
                absolute_x_coordinate: (signatory.x_coordinate / imageSize.width) * documentContainer.current.offsetWidth,
                absolute_y_coordinate: (signatory.y_coordinate / imageSize.height) * documentContainer.current.offsetHeight
            }

            setDocument(documentCopy);
        })
    }

    const calculateOffsetPDF = e => {
        document.document.signatories.forEach((signatory, i) => {
            let documentCopy = Object.assign({}, document);

            if (refsFull.current[signatory.page ? parseInt(signatory.page) : 0]) {
                if (refsFull.current[signatory.page ? parseInt(signatory.page) : 0].current) {
                    documentCopy.document.signatories[i] = {
                        ...signatory,
                        absolute_x_coordinate: (signatory.x_coordinate / refsFull.current[signatory.page ?
                            parseInt(signatory.page) :
                            0].current.offsetWidth) * refs.current[signatory.page ? parseInt(signatory.page) : 0].current.offsetWidth,
                        absolute_y_coordinate: (signatory.y_coordinate / refsFull.current[signatory.page ?
                            parseInt(signatory.page) :
                            0].current.offsetHeight) * refs.current[signatory.page ? parseInt(signatory.page) : 0].current.offsetHeight
                    }

                    setDocument(documentCopy);
                }
            }
        })
    }

    const uploadSignatureFile = file => {
        dispatch(documentActions.signDocumentNew(file.target.files[0], document.document._id, userToken));
    }

    const renderModals = () => {
        if (modal === "sign-document") {
            return <SignDocument
                user={user || decode(userToken)}
                setModal={setModal}
                closeModal={() => setModal(false)}
                signingDocument={documents.signingDocument}
                documentSignature={documentSignature}
                setDocumentSignature={setDocumentSignature}
                signatureCanvas={signatureCanvas}
                signature={signature}
                setSignature={setSignature}
                signatureType={signatureType}
                setSignatureType={setSignatureType}
                signDocument={signDocument}
                uploadSignatureFile={uploadSignatureFile} />;
        }
        return <div></div>;
    }

    const renderSignatureInterface = () => {
        const isNumPagesSet = numPages === undefined;

        if (imageError === false) {
            return <PageContainer className={`${isNumPagesSet ? 'width-75-percent' : ''}`}>
                <img
                    ref={documentContainer}
                    onLoad={calculateOffset}
                    onError={() => setImageError(true)}
                    src={document.document.file}
                    className="full-width right-margin-10"
                    alt="NIBSS Upload Document" />
                {document.document.signatories
                    .filter(signatory => signatory.email === (user?.data?.email || decode(userToken)?.data?.email))
                    .map((signatory, index) =>
                        signatory.absolute_x_coordinate !== undefined ?
                            <div
                                onClick={() => setModal("sign-document")}
                                key={index}
                                className="width-150 height-35 absolute cursor-pointer"
                                style={{
                                    left: signatory.absolute_x_coordinate,
                                    top: signatory.absolute_y_coordinate,
                                    backgroundColor: getColor(user?.data?.email || decode(userToken)?.data?.email)
                                }}></div>
                            : <div></div>
                    )}
            </PageContainer>
        }

        return <>
            <Document
                file={document.document.file}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {[...Array(numPages)].map((el, index) => (
                    <PageContainer
                        key={index}
                        ref={refs.current[index]}
                        className={`${index} ${isNumPagesSet ? 'width-75-percent' : 'full-width'} bottom-margin-20`}>
                        <Page width={700} key={`page_${index + 1}`} pageNumber={index + 1} />
                        {document.document.signatories
                            .filter(signatory => signatory.email === (user?.data?.email || decode(userToken)?.data?.email))
                            .map((signatory, i) =>
                                signatory.absolute_x_coordinate !== undefined && (parseInt(signatory.page) === index) ?
                                    <div
                                        onClick={() => setModal("sign-document")}
                                        key={index}
                                        className="width-150 height-35 absolute cursor-pointer"
                                        style={{
                                            left: signatory.absolute_x_coordinate,
                                            top: signatory.absolute_y_coordinate,
                                            backgroundColor: getColor(user?.data?.email || decode(userToken)?.data?.email)
                                        }}></div>
                                    : ""
                            )}
                    </PageContainer>
                ))}
            </Document>
            <div className="hide height-0 overflow-hidden">
                <Document
                    file={document.document.file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {[...Array(numPages)].map((el, index) => (
                        <PageContainer
                            ref={refsFull.current[index]}
                            key={index}
                            className={`${isNumPagesSet || numPages === null ? 'width-75-percent' : ''} bottom-margin-50`}>
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        </PageContainer>
                    ))}
                </Document>
            </div>
        </>
    }

    return (
        <>
            {modal !== false ?
                <ModalContainer closeModal={() => setModal(false)}>
                    {renderModals()}
                </ModalContainer>
                : ""}
            <div className={`full-width full-height overflow-scroll-y custom-scrollbar`}>
                <div
                    className={`onboarding 
                        display-flex 
                        flex-direction-column 
                        align-items-center 
                        bottom-padding-50 
                        smooth 
                        overflow-hidden 
                        width-70-percent 
                        margin-auto 
                        top-margin-70 
                        bottom-margin-5-percent 
                        border-box 
                        top-padding-50 
                        white 
                        border-radius-10 
                        box-shadow-less2`}>
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

const PageContainer = styled.div`
                border: 1px solid #CCC !important;
                &:hover {
                    border: 1px dashed #d8d8d8 !important;
                }
            `;

export default AppendSignature;
