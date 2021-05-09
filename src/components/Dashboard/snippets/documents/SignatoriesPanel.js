import React from "react";
import { getColor } from "helpers/getColor";
import Panel from "styles/styled-components/SignatoriesPanel";
import Draggable from "./Draggable";
import { getImageSize, getPage } from "helpers";

const SignatoriesPanel = ({
  signatories,
  documentContainer,
  refs,
  refsFull,
  initials,
  setInitials,
  setPlaceholders,
  pdfContainer,
  signatoryDragged,
  setSignatoryDragged,
}) => {
  const mouseUp = async (x, y) => {
    if (documentContainer.current) {
      setPlaceholders((currentPlaceholders) => {
        const userSigned = currentPlaceholders.findIndex(
          (user) =>
            user.name === signatoryDragged.name &&
            user.email === signatoryDragged.email
        );
        if (userSigned !== -1) {
          currentPlaceholders[userSigned] = {
            ...currentPlaceholders[userSigned],
            absolute_x_coordinate:
              x - documentContainer.current.getBoundingClientRect().left,
            absolute_y_coordinate:
              y - documentContainer.current.getBoundingClientRect().top,
          };

          return currentPlaceholders;
        } else {
          return [
            ...currentPlaceholders,
            {
              absolute_x_coordinate:
                x - documentContainer.current.getBoundingClientRect().left,
              absolute_y_coordinate:
                y - documentContainer.current.getBoundingClientRect().top,
              name: signatoryDragged.name,
              email: signatoryDragged.email,
            },
          ];
        }
      });

      const imageSize = await getImageSize(
        documentContainer.current.querySelector("img")
      );

      setPlaceholders((currentPlaceholders) => {
        const userSigned = currentPlaceholders.findIndex(
          (user) =>
            user.name === signatoryDragged.name &&
            user.email === signatoryDragged.email
        );

        if (userSigned !== -1) {
          currentPlaceholders[userSigned] = {
            ...currentPlaceholders[userSigned],
            x_coordinate:
              ((x - documentContainer.current.getBoundingClientRect().left) /
                documentContainer.current.offsetWidth) *
              imageSize.width,
            y_coordinate:
              ((y - documentContainer.current.getBoundingClientRect().top) /
                documentContainer.current.offsetHeight) *
              imageSize.height,
          };

          return currentPlaceholders;
        } else {
          return [
            ...currentPlaceholders,
            {
              x_coordinate:
                ((x - documentContainer.current.getBoundingClientRect().left) /
                  documentContainer.current.offsetWidth) *
                imageSize.width,
              y_coordinate:
                ((y - documentContainer.current.getBoundingClientRect().top) /
                  documentContainer.current.offsetHeight) *
                imageSize.height,
              name: signatoryDragged.name,
              email: signatoryDragged.email,
            },
          ];
        }
      });

      return;
    }

    const info = getPage(
      refs.current,
      y - pdfContainer.current.getBoundingClientRect().top
    );

    if (info) {
      setPlaceholders((p) => {
        const userSigned = p.findIndex(
          (user) =>
            user.name === signatoryDragged.name &&
            user.email === signatoryDragged.email
        );

        if (userSigned !== -1) {
          p[userSigned] = {
            ...p[userSigned],
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
          };

          return p;
        }

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
            name: signatoryDragged.name,
            email: signatoryDragged.email,
          },
        ];
      });
    }
  };

  const mouseUpInitial = async (x, y) => {
    if (documentContainer.current) {
        setInitials((currentinitials) => {
          return [
            ...currentinitials,
            {
              absolute_x_coordinate:
                x - documentContainer.current.getBoundingClientRect().left,
              absolute_y_coordinate:
                y - documentContainer.current.getBoundingClientRect().top,
            },
          ];
      });

      const imageSize = await getImageSize(
        documentContainer.current.querySelector("img")
      );

      setInitials((currentinitials) => {
          return [
            ...currentinitials,
            {
              x_coordinate:
                ((x - documentContainer.current.getBoundingClientRect().left) /
                  documentContainer.current.offsetWidth) *
                imageSize.width,
              y_coordinate:
                ((y - documentContainer.current.getBoundingClientRect().top) /
                  documentContainer.current.offsetHeight) *
                imageSize.height
            },
          ];
      });

      return;
    }

    const info = getPage(
      refs.current,
      y - pdfContainer.current.getBoundingClientRect().top
    );

    if (info) {
        setInitials((p) => {
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
      <div className="display-flex align-items-center">
        <div className="width-40 height-40 display-flex align-items-center">
          <img
            src={require(`images/icons/document/date.svg`)}
            className="height-18 right-margin-20"
            alt="NIBSS Date"
          />
        </div>
        <span className="size-pointeight-rem">Date Stamp</span>
      </div>
      <div className="display-flex align-items-center bottom-margin-70">
        <Draggable mouseUp={mouseUpInitial}>
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
