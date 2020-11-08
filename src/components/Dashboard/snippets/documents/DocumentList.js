/* eslint-disable */

import React from "react"
import EmptyDocument from "components/Dashboard/empty-states/Document";
import Document from "../Document";
import Pagination from "../Pagination";

const DocumentList = ({ dashboard, documents, viewPage, fetching, tab, viewDocument, viewStats }) => {
    return (
        documents.documents === undefined || fetching === true ?
            <EmptyDocument />
            :
            <>
                {documents?.documents?.data?.map((document, index) =>
                    <Document
                        key={index}
                        document={document}
                        viewDocument={viewDocument}
                        viewStats={viewStats}
                        dashboard={dashboard}
                    />
                ) ||
                    <div className="height-400 white border-radius-10 box-shadow-less2 display-flex align-items-center justify-center flex-direction-column">
                        <img src={require(`images/something-went-wrong.svg`)} className="height-100 bottom-margin-30" alt="NIBSS No data" />
                        You dont have any {tab === 2 ? "Pending " : tab === 3 ? "Signed " : tab === 4 ? "Rejected " : ""}documents
                    </div>
                }
                {documents?.documents?.data ?
                    <Pagination
                        data={documents.documents}
                        viewPage={viewPage}
                    />
                    : ""}
            </>
    )
}

export default DocumentList;
