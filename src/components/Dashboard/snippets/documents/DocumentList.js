/* eslint-disable */

import React from "react";
import EmptyDocument from "components/Dashboard/empty-states/EmptyDocument";
import Document from "../Document";
import Pagination from "../Pagination";

const DocumentList = ({
  dashboard,
  documents,
  viewPage,
  fetching,
  tab,
  viewDocument,
  viewStats,
}) => {
  const tabMap = { 2: "Pending", 3: "Signed", 4: "Rejected" };

  return documents?.documents === undefined || fetching === true ? (
    <EmptyDocument />
  ) : (
    <>
      {documents?.documents?.data?.map((document, index) => (
        <Document
          key={index}
          document={document}
          viewDocument={viewDocument}
          viewStats={viewStats}
          dashboard={dashboard}
        />
      )) || (
        <div className="height-400 white border-radius-10 box-shadow-less2 display-flex align-items-center justify-center flex-direction-column">
          <img
            src={require(`images/something-went-wrong.svg`)}
            className="height-100 bottom-margin-30"
            alt="NIBSS No data"
          />
          You dont have any {`${tabMap[tab]} `}documents
        </div>
      )}
      {documents?.documents?.data && (
        <Pagination data={documents.documents} viewPage={viewPage} />
      )}
    </>
  );
};

export default DocumentList;
