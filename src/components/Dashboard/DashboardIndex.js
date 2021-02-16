import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import PageTitle from "./snippets/PageTitle";
import DocumentList from "./snippets/documents/DocumentList";
import { useDispatch, useSelector } from "react-redux";
import { documentActions } from "actions/documentActions";
import { push } from "connected-react-router";
import DashboardCards from "./snippets/dashboard/DashboardCards";

const DashboardIndex = () => {
    const documents = useSelector(state => state.document);
    const [fetching, setFetching] = useState(false);
    const page = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(documentActions.fetch());
    }, [dispatch]);

    useEffect(() => {
        if (documents.fetching === false) {
            setFetching(false);
        }
    }, [documents.fetching]);

    const viewPage = p => {
        if (p <= documents?.documents.pagination.number_of_pages && p !== documents.documents.pagination.current) {
            page.current.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(documentActions.fetchPage('', p));
            setFetching(true);
        }
    }

    const viewDocument = (document) => {
        dispatch(documentActions.setDocument(document));

        if (document.signed) {
            dispatch(push(`/dashboard/document/${document._id}`));
        } else {
            dispatch(push(`/dashboard/append-signature/${document._id}`));
        }
    }

    return (
        <div ref={page} className="full-width full-height custom-scrollbar overflow-auto-y border-box left-padding-30 right-padding-30">
            <PageTitle
                title="Summary"
                breadcrumb="Analytics"
            />
            <DashboardCards documents={documents} />
            <SubSectionTitle className="top-margin-50 bold size-pointnine-rem bottom-margin-20">
                Recently uploaded documents
            </SubSectionTitle>
            <DocumentList
                page={page}
                fetching={fetching}
                viewPage={viewPage}
                dashboard={true}
                documents={documents}
                viewDocument={viewDocument}
            />
        </div>
    )
}

const SubSectionTitle = styled.p`
                        color: #182538;
                    `;

export default DashboardIndex;
