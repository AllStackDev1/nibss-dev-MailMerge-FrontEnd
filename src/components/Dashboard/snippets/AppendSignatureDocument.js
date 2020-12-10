import React from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import Trigger from "./append-signature/Trigger";
import styled from 'styled-components';
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const AppendSignatureDocument = ({ pageWidth, docRef, refs, refsFull, signatories, setModal, numPages, setNumPages,
    isNumPagesSet, width75percent, document, setDocument, signDocumentConst, user, userToken }) => {

    function onDocumentLoadSuccess({ numPages: numPs }) {
        setNumPages(numPs);
        docRef.current = docRef.current.splice(0, numPs);
        for (let i = 0; i < numPs; i++) {
            docRef.current[i] = docRef.current[i] || React.createRef();
        }
        docRef.current = docRef.current.map((item) => item || React.createRef());

        setTimeout(calculateOffsetPDF, 1000);
    }

    const calculateOffsetPDF = e => {
        document.document.signatories.forEach((signatory, i) => {
            const documentCopy = Object.assign({}, document);

            if (refsFull.current[signatory.page ? parseInt(signatory.page) : 0]?.current) {
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
        })
    }

    return (
        <Document
            file={document.document.file}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            {[...Array(numPages)].map((el, index) => (
                <PageContainer
                    key={index}
                    ref={docRef.current[index]}
                    className={`${index} ${isNumPagesSet ? width75percent : 'full-width'} bottom-margin-20`}>
                    <Page width={pageWidth} key={`page_${index + 1}`} pageNumber={index + 1} />
                    {signatories?.map((signatory, i) =>
                        signatory.absolute_x_coordinate !== undefined && (parseInt(signatory.page) === index) ?
                            <Trigger signatory={signatory} signDocumentConst={signDocumentConst} index={index} setModal={setModal}
                                user={user} userToken={userToken} />
                            : <div></div>
                    )}
                </PageContainer>
            ))}
        </Document>
    )
}

const PageContainer = styled.div`
                border: 1px solid #CCC !important;
                &:hover {
                    border: 1px dashed #d8d8d8 !important;
                }
            `;

export default AppendSignatureDocument;
