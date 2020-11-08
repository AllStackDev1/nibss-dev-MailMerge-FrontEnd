import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import PageTitle from "./snippets/PageTitle";
import DocumentList from "./snippets/documents/DocumentList";
import { useDispatch, useSelector } from "react-redux";
import { documentActions } from "actions/documentActions";
import { push } from "connected-react-router";

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
        if (p <= documents.documents.pagination.number_of_pages && p !== documents.documents.pagination.current) {
            page.current.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch(documentActions.fetchPage('', p));
            setFetching(true);
        }
    }

    const viewDocument = (document) => {
        dispatch(documentActions.setDocument(document));

        if(document.signed) {
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
            <Cards className="full-width display-flex space-between">
                <Card className="padding-20 border-box">
                    <div className="full-width display-flex space-between align-items-center">
                        <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/analytics/all-documents.svg`)} className="height-20" alt="NIBSS Empty" />
                        </div>
                        {documents?.documents && documents.fetching !== true ?
                            <span className="bold size-two-rem">{documents?.documents?.total_documents || 0}</span>
                            :
                            <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>}
                    </div>
                    <p className="absolute bottom-20 left-20 bold size-pointeight-rem">All Documents</p>
                </Card>
                <Card className="padding-20 border-box">
                    <div className="full-width display-flex space-between align-items-center">
                        <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/analytics/archived-documents.svg`)} className="height-20" alt="NIBSS Empty" />
                        </div>
                        {documents?.documents && documents.fetching !== true ?
                            <span className="bold size-two-rem">{documents?.documents?.document_stats?.archived_document || 0}</span>
                            :
                            <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>}

                    </div>
                    <p className="absolute bottom-20 left-20 bold size-pointeight-rem">Archived Documents</p>
                </Card>
                <Card className="padding-20 border-box">
                    <div className="full-width display-flex space-between align-items-center">
                        <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/analytics/signed-documents.svg`)} className="height-25" alt="NIBSS Empty" />
                        </div>
                        {documents?.documents && documents.fetching !== true ?
                            <span className="bold size-two-rem">{documents?.documents?.document_stats?.signed_document || 0}</span>
                            :
                            <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>}
                    </div>
                    <p className="absolute bottom-20 left-20 bold size-pointeight-rem">Signed Documents</p>
                </Card>
                <Card className="padding-20 border-box">
                    <div className="full-width display-flex space-between align-items-center">
                        <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/analytics/pending-documents.svg`)} className="height-25" alt="NIBSS Empty" />
                        </div>
                        {documents?.documents && documents.fetching !== true ?
                            <span className="bold size-two-rem">{documents?.documents?.document_stats?.pending_document || 0}</span>
                            :
                            <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>}
                    </div>
                    <p className="absolute bottom-20 left-20 bold size-pointeight-rem">Pending Document</p>
                </Card>
            </Cards>
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

const Cards = styled.div`
                        margin-top: 30px;
                        &>div {
                            width: calc((100% - 45px) / 4);
                            height: 130px;
                            background: #FFF;
                            border-radius: 10px;
                        }
                    `;

const Card = styled.div`
                        &:first-of-type>div>div:first-of-type {
                            background: rgba(251, 185, 0, 0.3);
                        }
                        &:nth-of-type(2)>div>div:first-of-type {
                            background: rgba(93, 38, 132, 0.3);
                        }
                        &:nth-of-type(3)>div>div:first-of-type {
                            background: rgba(67, 207, 89, 0.3);
                        }
                        &:nth-of-type(4)>div>div:first-of-type {
                            background: rgba(51, 110, 214, 0.3);
                        }
                    `;

const SubSectionTitle = styled.p`
                        color: #182538;
                    `;

const Loader = styled.div`
                    width: 30px;
                    height: 30px;
                    & > div {
                        width: 30px;
                        height: 30px;
                        border-color: #9E7D0A transparent transparent transparent
                    }
                `;

export default DashboardIndex;
