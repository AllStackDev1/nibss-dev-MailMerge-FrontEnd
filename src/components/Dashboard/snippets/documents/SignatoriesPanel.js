import React from "react";
import { getColor } from "helpers/getColor";
import Panel from "styles/styled-components/SignatoriesPanel";
import Draggable from "./Draggable";
import { getImageSize, getPage } from "helpers";

const SignatoriesPanel = ({
  refs,
  refsFull,
  signatories,
  pdfContainer,
  setPlaceholders,
  signatoryDragged,
  documentContainer,
  setSignatoryDragged,
  setDocumentProperties,
  documentPropertyDragged,
  setDocumentPropertyDragged
}) => {
  const mouseUp = async (x, y) => {

    if (documentContainer.current) {
      const imageSize = await getImageSize(
        documentContainer.current.querySelector("img")
      );

      if(imageSize){
        setPlaceholders((currentPlaceholders) => {
          const updateIndex = currentPlaceholders.findIndex(e=> e.email === signatoryDragged.email)
          if(updateIndex !== -1){
            currentPlaceholders[updateIndex].coordinates.push({
              absolute_x_coordinate:
              x - documentContainer.current.getBoundingClientRect().left,
              absolute_y_coordinate:
                y - documentContainer.current.getBoundingClientRect().top,
              x_coordinate:
              ((x - documentContainer.current.getBoundingClientRect().left) /
                documentContainer.current.offsetWidth) *
              imageSize.width,
              y_coordinate:
                ((y - documentContainer.current.getBoundingClientRect().top) /
                  documentContainer.current.offsetHeight) *
                imageSize.height,
            }) 
            return currentPlaceholders
          }else{
            return [
              ...currentPlaceholders,
              {
                name: signatoryDragged.name,
                email: signatoryDragged.email,
                coordinates: [
                  {
                    absolute_x_coordinate:
                    x - documentContainer.current.getBoundingClientRect().left,
                    absolute_y_coordinate:
                      y - documentContainer.current.getBoundingClientRect().top,
                    x_coordinate:
                    ((x - documentContainer.current.getBoundingClientRect().left) /
                      documentContainer.current.offsetWidth) *
                    imageSize.width,
                    y_coordinate:
                      ((y - documentContainer.current.getBoundingClientRect().top) /
                        documentContainer.current.offsetHeight) *
                      imageSize.height,
                  }
                ]
              },
            ];
          }
        });
      }

      return;
    }

    const info = getPage(
      refs.current,
      y - pdfContainer.current.getBoundingClientRect().top
    );

    if (info) {
      setPlaceholders((p) => {
        const updateIndex = p.findIndex(e=> e.email === signatoryDragged.email)
        if(updateIndex !== -1){
          p[updateIndex].coordinates.push({
            page: info.page,
            absolute_x_coordinate:
              x - pdfContainer.current.getBoundingClientRect().left,
            absolute_y_coordinate: info.offset,
            x_coordinate:
              ((x - pdfContainer.current.getBoundingClientRect().left) /
                refs.current[info.page].current.offsetWidth) *
              refsFull.current[info.page].current.offsetWidth,
            y_coordinate:
              (info.offset / refs.current[info.page].current.offsetHeight) *
              refsFull.current[info.page].current.offsetHeight,
          }) 
          return p
        }else{
          return [
            ...p,
            {
              name: signatoryDragged.name,
              email: signatoryDragged.email,
              coordinates: [
                {
                  page: info.page,
                  absolute_x_coordinate:
                    x - pdfContainer.current.getBoundingClientRect().left,
                  absolute_y_coordinate: info.offset,
                  x_coordinate:
                    ((x - pdfContainer.current.getBoundingClientRect().left) /
                      refs.current[info.page].current.offsetWidth) *
                    refsFull.current[info.page].current.offsetWidth,
                  y_coordinate:
                    (info.offset / refs.current[info.page].current.offsetHeight) *
                    refsFull.current[info.page].current.offsetHeight,
                }
              ]
            },
          ];
        }
      });
    }
  };

  const mouseUpDocumentProperty = async (x, y) => {
    if (documentContainer.current) {
      const imageSize = await getImageSize(
        documentContainer.current.querySelector("img")
      );

      if(imageSize){
        setDocumentProperties((documentProperties) => {
          return [
            ...documentProperties,
            {
              absolute_x_coordinate:
              x - documentContainer.current.getBoundingClientRect().left,
            absolute_y_coordinate:
              y - documentContainer.current.getBoundingClientRect().top,
              x_coordinate:
                ((x - documentContainer.current.getBoundingClientRect().left) /
                  documentContainer.current.offsetWidth) *
                imageSize.width,
              y_coordinate:
                ((y - documentContainer.current.getBoundingClientRect().top) /
                  documentContainer.current.offsetHeight) *
                imageSize.height,
              name: documentPropertyDragged
            },
          ];
      });
      }

      return;
    }

    const info = getPage(
      refs.current,
      y - pdfContainer.current.getBoundingClientRect().top
    );

    if (info) {
        setDocumentProperties((p) => {
        return [
          ...p,
          {
            page: info.page,
            absolute_x_coordinate:
              x - pdfContainer.current.getBoundingClientRect().left,
            absolute_y_coordinate: info.offset,
            x_coordinate:
              ((x - pdfContainer.current.getBoundingClientRect().left) /
                refs.current[info.page].current.offsetWidth) *
              refsFull.current[info.page].current.offsetWidth,
            y_coordinate:
              (info.offset / refs.current[info.page].current.offsetHeight) *
              refsFull.current[info.page].current.offsetHeight,
            name: documentPropertyDragged
          },
        ];
      });
    }
  };

  return (
    <Panel>
      <div className="display-flex align-items-center">
        <div className="width-40 height-40 display-flex align-items-center">
          <img
            src={require(`images/icons/document/signature.svg`)}
            className="height-18 right-margin-20"
            alt="NIBSS Signature"
          />
        </div>
        <span className="size-pointeight-rem">Signature</span>
      </div>
      <div className="display-flex align-items-center bottom-margin-80">
      <Draggable mouseUp={mouseUpDocumentProperty} setName={setDocumentPropertyDragged} name='dateStamp'>
        <div className="width-40 height-40 display-flex align-items-center">
          <img
            src={require(`images/icons/document/date.svg`)}
            className="height-18 right-margin-20"
            alt="NIBSS Date"
          />
        </div>
        <span className="size-pointeight-rem">Date Stamp</span>
        </Draggable>
      </div>
      <div className="display-flex align-items-center bottom-margin-80">
        <Draggable mouseUp={mouseUpDocumentProperty} setName={setDocumentPropertyDragged} name='initials'>
          <div className="width-40 height-40 display-flex align-items-center">
            <img
              src={require(`images/icons/document/initials.svg`)}
              className="height-18 right-margin-20"
              alt="NIBSS Initials"
            />
          </div>
          <span className="size-pointeight-rem">Initials</span>
        </Draggable>
      </div>
      <p className="size-pointeight-rem bold">Assigned To</p>
      {signatories.length > 0 ? (
        signatories.map((signatory, index) => (
          <div className="top-margin-10 height-50" key={index}>
            <Draggable
              mouseUp={mouseUp}
              user={signatory}
              setSignatoryDragged={setSignatoryDragged}
            >
              <div
                style={{ backgroundColor: getColor(signatory.name) }}
                className="height-20 width-20 right-margin-10"
              ></div>
              <p className="size-pointseven-rem">{signatory.name}</p>
            </Draggable>
          </div>
        ))
      ) : (
        <i className="top-margin-30 size-pointeight-rem light">
          No signatories selected
        </i>
      )}
    </Panel>
  );
};

export default SignatoriesPanel;
