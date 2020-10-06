import React, { useState, useRef } from "react"
import { getColor } from "helpers/getColor";
import Draggable from "./Draggable";
import { getImageSize } from "helpers";
import { isFileImage } from "helpers/isFileImage";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const SigningSetup = ({ signatories, placeholders, setPlaceholders, documentFiles }) => {
    const [signatoryDragged, setSignatoryDragged] = useState(false);
    const [numPages, setNumPages] = useState(null);

    const documentContainer = useRef(null);

    const mouseUp = async (x, y) => {
        setPlaceholders(placeholders => {
            let userSigned = placeholders.findIndex(user => user.name === signatoryDragged.name && user.email === signatoryDragged.email);
            if (userSigned !== -1) {
                placeholders[userSigned] = {
                    ...placeholders[userSigned],
                    absolute_x_coordinate: x - documentContainer.current.getBoundingClientRect().left,
                    absolute_y_coordinate: y - documentContainer.current.getBoundingClientRect().top,
                }

                return placeholders;
            } else {
                return [
                    ...placeholders,
                    {
                        absolute_x_coordinate: x - documentContainer.current.getBoundingClientRect().left,
                        absolute_y_coordinate: y - documentContainer.current.getBoundingClientRect().top,
                        name: signatoryDragged.name,
                        email: signatoryDragged.email
                    }
                ];
            }
        });

        let imageSize = await getImageSize(documentContainer.current.querySelector('img'));

        setPlaceholders(placeholders => {
            let userSigned = placeholders.findIndex(user => user.name === signatoryDragged.name && user.email === signatoryDragged.email);

            if (userSigned !== -1) {
                placeholders[userSigned] = {
                    ...placeholders[userSigned],
                    x_coordinate: ((x - documentContainer.current.getBoundingClientRect().left) / documentContainer.current.offsetWidth) * imageSize.width,
                    y_coordinate: ((y - documentContainer.current.getBoundingClientRect().top) / documentContainer.current.offsetHeight) * imageSize.height
                }

                return placeholders;
            } else {
                return [
                    ...placeholders,
                    {
                        x_coordinate: ((x - documentContainer.current.getBoundingClientRect().left) / documentContainer.current.offsetWidth) * imageSize.width,
                        y_coordinate: ((y - documentContainer.current.getBoundingClientRect().top) / documentContainer.current.offsetHeight) * imageSize.height,
                        name: signatoryDragged.name,
                        email: signatoryDragged.email
                    }
                ];
            }
        });
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <>
            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Signing Setup</p>
            <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Tell us who is signing this documents</p>
            <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>

            <div className="full-height display-flex width-85-percent top-margin-40 border-box bottom-padding-30">
                {documentFiles ?
                    documentFiles.map((documentFile, index) =>
                        <React.Fragment key={index}>
                            {isFileImage(documentFile) ?
                                <PageContainer key={index} ref={documentContainer} className={`${numPages === undefined || numPages === null ? 'width-75-percent' : ''} right-margin-50`}>
                                    <img src={documentFile} className="full-width right-margin-10" alt="NIBSS Upload Document" />
                                </PageContainer>
                                :
                                <Document
                                    file={documentFile}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <PageContainer key={index} ref={documentContainer} className={`${numPages === undefined || numPages === null ? 'width-75-percent' : ''}right-margin-50 bottom-margin-20`}>
                                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                        </PageContainer>
                                    ))}
                                </Document>
                            }
                            {placeholders.map((placeholder, index) =>
                                <div key={index} className="width-180 height-40 absolute" style={{ left: placeholder.absolute_x_coordinate, top: placeholder.absolute_y_coordinate, backgroundColor: getColor(placeholder.name) }}></div>
                            )}
                        </React.Fragment>
                    )
                    : ""}
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
                    {signatories.length > 0 ?
                        signatories.map((signatory, index) =>
                            <div className="top-margin-10 height-50" key={index}>
                                <Draggable mouseUp={mouseUp} user={signatory} setSignatoryDragged={setSignatoryDragged}>
                                    <div style={{ backgroundColor: getColor(signatory.name) }} className="height-20 width-20 right-margin-10"></div>
                                    <p className="size-pointseven-rem">{signatory.name}</p>
                                </Draggable>
                            </div>
                        )
                        : <i className="top-margin-30 size-pointeight-rem light">No signatories selected</i>}
                </div>
            </div>
        </>
    )
}

const PageContainer = styled.div`
    border: 1px solid #CCC !important;
    &:hover {
        border: 1px dashed #d8d8d8 !important;
    }
`;

export default SigningSetup;