import React, { useState, useRef } from "react"
import { getColor } from "helpers/getColor";
import Draggable from "./Draggable";
import { getImageSize } from "helpers";
import { isFileImage } from "helpers/isFileImage";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import { getPage } from "helpers/getPage";
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const SigningSetup = ({ signatories, placeholders, setPlaceholders, documentFiles }) => {
    const [hovering, setHovering] = useState(false);
    const [signatoryDragged, setSignatoryDragged] = useState(false);
    const [numPages, setNumPages] = useState(null);

    const documentContainer = useRef(null);
    const pdfContainer = useRef(null);
    const refs = useRef([React.createRef(), React.createRef()]);
    const refsFull = useRef([React.createRef(), React.createRef()]);

    const mouseUp = async (x, y) => {
        if (documentContainer.current) {
            setPlaceholders(placeholders => {
                const userSigned = placeholders.findIndex(user => user.name === signatoryDragged.name && user.email === signatoryDragged.email);
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
        } else {
            const info = getPage(refs.current, y - pdfContainer.current.getBoundingClientRect().top);

            setPlaceholders(p => {
                let userSigned = p.findIndex(user => user.name === signatoryDragged.name && user.email === signatoryDragged.email);

                if (userSigned !== -1) {
                    p[userSigned] = {
                        ...p[userSigned],
                        page: info.page,
                        absolute_x_coordinate: x - pdfContainer.current.getBoundingClientRect().left,
                        absolute_y_coordinate: info.offset,
                        x_coordinate: ((x - pdfContainer.current.getBoundingClientRect().left) /
                            refs.current[info.page].current.offsetWidth) * refsFull.current[info.page].current.offsetWidth,
                        y_coordinate: ((info.offset) / refs.current[info.page].current.offsetHeight) * refsFull.current[info.page].current.offsetHeight
                    }

                    return p;
                } else {
                    return [
                        ...p,
                        {
                            page: info.page,
                            absolute_x_coordinate: x - pdfContainer.current.getBoundingClientRect().left,
                            absolute_y_coordinate: info.offset,
                            x_coordinate: ((x - pdfContainer.current.getBoundingClientRect().left) /
                                refs.current[info.page].current.offsetWidth) * refsFull.current[info.page].current.offsetWidth,
                            y_coordinate: ((info.offset) / refs.current[info.page].current.offsetHeight) * refsFull.current[info.page].current.offsetHeight,
                            name: signatoryDragged.name,
                            email: signatoryDragged.email
                        }
                    ];
                }
            });
        }
    }

    function onDocumentLoadSuccess({ numPages: numPagesLoaded }) {
        setNumPages(numPagesLoaded);
        refs.current = refs.current.splice(0, numPagesLoaded);
        for (let i = 0; i < numPagesLoaded; i++) {
            refs.current[i] = refs.current[i] || React.createRef();
        }
        refs.current = refs.current.map((item) => item || React.createRef());

        refsFull.current = refsFull.current.splice(0, numPagesLoaded);
        for (let i = 0; i < numPagesLoaded; i++) {
            refsFull.current[i] = refsFull.current[i] || React.createRef();
        }
        refsFull.current = refsFull.current.map((item) => item || React.createRef());
    }

    const renderFiles = (documentFile, index) => {
        const isNumPages = numPages === undefined || numPages === null;

        if (isFileImage(documentFile)) {
            return <PageContainer
                key={index}
                ref={documentContainer}
                className={`${isNumPages ? 'width-75-percent' : ''}`}
                onMouseOver={e => {
                    e.preventDefault();
                    setHovering(true);
                }}
                onMouseLeave={e => setHovering(false)}>
                <img src={documentFile} className="full-width right-margin-10" alt="NIBSS Upload Document" />
                {placeholders.map((placeholder, i) =>
                    <div
                        key={i}
                        className="width-180 height-40 absolute"
                        style={{ left: placeholder.absolute_x_coordinate, top: placeholder.absolute_y_coordinate, backgroundColor: getColor(placeholder.name) }}></div>
                )}
            </PageContainer>
        }

        return <>
            <Document
                file={documentFile}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {[...Array(numPages)].map((el, index) => (
                    <PageContainer
                        ref={refs.current[index]}
                        key={index}
                        className={`${index} ${isNumPages ? 'width-75-percent' : ''} bottom-margin-50 ${hovering ? 'one' : ''}`}
                        onMouseOver={e => {
                            e.preventDefault();
                            setHovering(true);
                        }}
                        onMouseLeave={e => setHovering(false)}>
                        <Page width={550} key={`page_${index + 1}`} pageNumber={index + 1} />
                        {placeholders.map((placeholder, i) =>
                            placeholder.page === (index) ?
                                <div
                                    key={i}
                                    className="width-180 height-40 absolute"
                                    style={{
                                        left: placeholder.absolute_x_coordinate,
                                        top: placeholder.absolute_y_coordinate,
                                        backgroundColor: getColor(placeholder.name)
                                    }}></div>
                                : <div></div>
                        )}
                    </PageContainer>
                ))}
            </Document>
            <div className="hide height-0 overflow-hidden">
                <Document
                    file={documentFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {[...Array(numPages)].map((el, index) => (
                        <PageContainer
                            ref={refsFull.current[index]}
                            key={index}
                            className={`${isNumPages ? 'width-75-percent' : ''} bottom-margin-50`}
                            onMouseOver={e => {
                                e.preventDefault();
                                setHovering(true);
                            }}
                            onMouseLeave={e => setHovering(false)}>
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        </PageContainer>
                    ))}
                </Document>
            </div>
        </>
    }

    return (
        <>
            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Signing Setup</p>
            <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Tell us who is signing this document</p>
            <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>

            <div className="full-height display-flex width-85-percent top-margin-40 border-box bottom-padding-30">
                <div ref={pdfContainer} className={`${numPages === undefined || numPages === null ? "min-width-70-percent" : ""} right-margin-50`}>
                    {documentFiles?.map((documentFile, index) =>
                        <React.Fragment key={index}>
                            {renderFiles(documentFile, index)}
                        </React.Fragment>
                    )}
                </div>
                <SignatoriesPanel>
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
                </SignatoriesPanel>
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

const SignatoriesPanel = styled.div`
    position: fixed;
    top: 300px;
    right: 9%;
    height: calc(100vh - 300px);
    overflow-y: auto;
    width: calc(((25 * (80%)) / 100) - 50px);
`;

export default SigningSetup;
