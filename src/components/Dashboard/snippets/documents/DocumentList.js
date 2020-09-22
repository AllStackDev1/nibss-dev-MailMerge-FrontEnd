/* eslint-disable */

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { documentActions } from "actions/documentActions";
import { push } from "connected-react-router";
import EmptyDocument from "components/Dashboard/empty-states/Document";
import Document from "../Document";
import Pagination from "../Pagination";

const DocumentList = ({page, pageId, dashboard}) => {
    const dispatch = useDispatch();

    const documents = useSelector(state => state.document);


    useEffect(() => {
        if (pageId) {
            page.current.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(documentActions.fetchPage(pageId));
        } else {
            dispatch(documentActions.fetch());
        }
    }, [dispatch, pageId]);

    const viewPage = page => {
        if (page <= documents.documents.pagination.number_of_pages && page !== documents.documents.pagination.current) {
            dispatch(push(`/dashboard/documents/${page}`));
        }
    }

    return (
        documents.documents === undefined ?
            <EmptyDocument />
            :
            <>
                {documents.documents.data.map((document, index) =>
                    <Document
                        key={index}
                        document={document}
                        dashboard={dashboard}
                    />
                )}
                <Pagination
                    data={documents.documents}
                    viewPage={viewPage}
                />
            </>
    )
}

export default DocumentList;