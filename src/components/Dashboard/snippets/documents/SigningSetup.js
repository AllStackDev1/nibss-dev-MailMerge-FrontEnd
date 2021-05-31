import React, { useState, useRef } from "react";
import { getColor } from "helpers/getColor";
import { isFileImage } from "helpers/isFileImage";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import SignatoriesPanel from "./SignatoriesPanel";
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const SigningSetup = ({
  documentProperties,
  setDocumentProperties,
  signatories,
  placeholders,
  setPlaceholders,
  documentFiles,
}) => {
  const [hovering, setHovering] = useState(false);
  const [signatoryDragged, setSignatoryDragged] = useState(false);
  const [documentPropertyDragged, setDocumentPropertyDragged] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const documentContainer = useRef(null);
  const pdfContainer = useRef(null);
  const refs = useRef([React.createRef(), React.createRef()]);
  const refsFull = useRef([React.createRef(), React.createRef()]);

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
    refsFull.current = refsFull.current.map(
      (item) => item || React.createRef()
    );
  }

  const handleRemove = (index, type, coorIdx) => {
    if (type === "documentProperty") {
      const newDate = documentProperties.filter((e, idx) => idx !== index);
      setDocumentProperties(newDate);
    } else {
        const placeholder = placeholders.find((e, idx) => idx === index);
        if(placeholder){
          if(placeholder.coordinates.length > 1){
            const newPlaceholders = placeholders.filter((e, idx) => idx !== index);
            placeholder.coordinates = placeholder.coordinates.filter((e, idx) => idx !== coorIdx);
            setPlaceholders([...newPlaceholders, placeholder ]);
          }else{
            const newPlaceholders = placeholders.filter((e, idx) => idx !== index);
            setPlaceholders(newPlaceholders);
          }
        }
    }
  };

  const renderFiles = (documentFile) => {
    const isNumPages =
      numPages === undefined || numPages === null ? "width-75-percent" : "";

    if (isFileImage(documentFile)) {
      return (
        <PageContainer
          ref={documentContainer}
          onMouseOver={(e) => {
            e.preventDefault();
            setHovering(true);
          }}
          onMouseLeave={(e) => setHovering(false)}
          data-test="page-container"
        >
          <img
            src={documentFile}
            className="full-width right-margin-10"
            alt="NIBSS Upload Document"
          />
          {placeholders.map((placeholder, i) => (
              placeholder.coordinates.map((c, _i) => {
                return (
                  <div
                    key={_i}
                    className="width-180 height-40 size-pointeightfive-rem absolute"
                    style={{
                      left: c.absolute_x_coordinate,
                      top: c.absolute_y_coordinate,
                      border: `2px solid ${getColor(placeholder.name)}`,
                    }}
                  >
                    <div className="relative full-width full-height display-flex justify-center align-items-center">
                      <div
                        role="button"
                        className="absolute"
                        style={{
                          top: 0,
                          right: 0,
                          padding: "2px 5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRemove(i, "placeholders", _i)}
                      >
                        <span
                          className="material-icons smooth"
                          style={{
                            fontSize: 20,
                            color: "red",
                          }}
                        >
                          delete
                        </span>
                      </div>
                      {placeholder.name} signs
                    </div>
                  </div>
                )
            })
          ))}
          {documentProperties?.map((documentProperty, i) => (
            <div
              key={i}
              className="width-180 height-40 size-pointeightfive-rem absolute"
              style={{
                left: documentProperty.absolute_x_coordinate,
                top: documentProperty.absolute_y_coordinate,
                border: "2px solid gray",
              }}
            >
              <div className="relative full-width full-height display-flex justify-center align-items-center">
                <div
                  role="button"
                  className="absolute"
                  style={{
                    top: 0,
                    right: 0,
                    padding: "2px 5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemove(i, "documentProperty")}
                >
                  <span
                    className="material-icons smooth"
                    style={{
                      fontSize: 20,
                      color: "red",
                    }}
                  >
                    delete
                  </span>
                </div>
                {documentProperty.name} Here
              </div>
            </div>
          ))}
        </PageContainer>
      );
    }

    return (
      <>
        <Document
          file={documentFile}
          loading={
            <Loader className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </Loader>
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {[...Array(numPages)].map((el, i) => (
            <PageContainer
              ref={refs.current[i]}
              key={i}
              className={`${i} ${isNumPages} bottom-margin-50 ${
                hovering ? "one" : ""
              }`}
              onMouseOver={(e) => {
                e.preventDefault();
                setHovering(true);
              }}
              onMouseLeave={(e) => setHovering(false)}
              data-test="page-containe-1"
            >
              <Page width={550} pageNumber={i + 1} />
              {placeholders?.map((placeholder, placeholderIndex) => (
                <React.Fragment key={placeholderIndex}>
                  {placeholder.coordinates.map((c, _i) => {
                    return (
                      c.page === i && (
                        <div
                          key={_i}
                          className="width-180 height-40 size-pointeightfive-rem absolute"
                          style={{
                            left: c.absolute_x_coordinate,
                            top: c.absolute_y_coordinate,
                            // backgroundColor: getColor(placeholder.name),
                            border: `2px solid ${getColor(placeholder.name)}`,
                          }}
                        >
                          <div className="relative full-width full-height display-flex justify-center align-items-center">
                            <div
                              role="button"
                              className="absolute"
                              style={{
                                top: 0,
                                right: 0,
                                padding: "2px 5px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleRemove(placeholderIndex, "placeholders", _i)
                              }
                            >
                              <span
                                className="material-icons smooth"
                                style={{
                                  fontSize: 20,
                                  color: "red",
                                }}
                              >
                                delete
                              </span>
                            </div>
                            {placeholder.name} signs
                          </div>
                        </div>
                      )
                    )
                  })}
                </React.Fragment>
              ))}
              {documentProperties?.map((documentProperty, initialIndex) => (
                <React.Fragment key={initialIndex}>
                  {documentProperty.page === i ? (
                    <div
                      className="width-180 height-40 size-pointeightfive-rem absolute"
                      style={{
                        textTransform: "capitalize",
                        left: documentProperty.absolute_x_coordinate,
                        top: documentProperty.absolute_y_coordinate,
                        border: "2px solid gray",
                      }}
                    >
                      <div className="relative full-width full-height display-flex justify-center align-items-center">
                        <div
                          role="button"
                          className="absolute"
                          style={{
                            top: 0,
                            right: 0,
                            padding: "2px 5px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleRemove(initialIndex, "documentProperty")
                          }
                        >
                          <span
                            className="material-icons smooth"
                            style={{
                              fontSize: 20,
                              color: "red",
                            }}
                          >
                            delete
                          </span>
                        </div>
                        {documentProperty.name} Here
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </React.Fragment>
              ))}
            </PageContainer>
          ))}
        </Document>
        <div className="hide height-0 overflow-hidden">
          <Document
            file={documentFile}
            onLoadSuccess={onDocumentLoadSuccess}
            data-test="page-document"
          >
            {[...Array(numPages)].map((el, i) => (
              <PageContainer
                ref={refsFull.current[i]}
                key={i}
                className={`${isNumPages} bottom-margin-50`}
                onMouseOver={(e) => {
                  e.preventDefault();
                  setHovering(true);
                }}
                onMouseLeave={(e) => setHovering(false)}
                data-test="page-containe-2"
              >
                <Page key={`page_${i + 1}`} pageNumber={i + 1} />
              </PageContainer>
            ))}
          </Document>
        </div>
      </>
    );
  };

  return (
    <>
      <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">
        Signing Setup
      </p>
      <p className="light-gray-color size-pointeight-rem text-center top-margin-5">
        Tell us who is signing this document
      </p>
      <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>

      <div className="display-flex width-85-percent top-margin-40 border-box bottom-padding-30">
        <div 
          style={{ height: "50vh", overflowY: "scroll" }}
          className={`${
            numPages === undefined || numPages === null
              ? "width-70-percent "
              : " "
          }right-margin-30`}
          >
          <div
            ref={pdfContainer}
            className='right-margin-30'
          >
            {documentFiles?.map((documentFile, index) => (
              <React.Fragment key={index}>
                {renderFiles(documentFile)}
              </React.Fragment>
            ))}
          </div>
        </div>

        <SignatoriesPanel
          refs={refs}
          refsFull={refsFull}
          signatories={signatories}
          setDocumentProperties={setDocumentProperties}
          pdfContainer={pdfContainer}
          setPlaceholders={setPlaceholders}
          signatoryDragged={signatoryDragged}
          documentContainer={documentContainer}
          setSignatoryDragged={setSignatoryDragged}
          documentPropertyDragged={documentPropertyDragged}
          setDocumentPropertyDragged={setDocumentPropertyDragged}
        />
      </div>
    </>
  );
};

const PageContainer = styled.div`
  border: 1px solid #ccc !important;
  &:hover {
    border: 1px dashed #d8d8d8 !important;
  }
`;

const Loader = styled.div`
  display: flex;
  margin: auto;
  width: 40px;
  height: 40px;
  & > div {
    width: 40px;
    height: 40px;
    border-color: #9e7d0a transparent transparent transparent;
  }
`;

export default SigningSetup;
