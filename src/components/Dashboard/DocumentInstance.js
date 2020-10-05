import { documentActions } from "actions/documentActions";
import { push } from "connected-react-router";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Log from "./snippets/documents/Log";
import PageTitle from "./snippets/PageTitle";

const DocumentInstance = ({ user }) => {
    const [tab, setTab] = useState(1);
    const [document, setDocument] = useState({});
    const documents = useSelector(state => state.document);

    const { documentId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(documentActions.fetchSingle(documentId));
    }, [dispatch, documentId]);

    useEffect(() => {
        if (documents.fetchingSingle === false && documents.document) {
            setDocument(documents.document);
        }
    }, [documents.fetchingSingle, documents.document]);

    const goBack = () => {
        dispatch(push('/dashboard/documents'));
    }

    return (
        <div className="full-width height-auto bottom-padding-20 border-box left-padding-30 right-padding-30 display-flex flex-direction-column">
            <BackButton onClick={goBack} className="cursor-pointer display-flex size-pointnine-rem align-items-center mustard-color left above bold">
                <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                BACK
            </BackButton>
            <PageTitle
                title="Document"
            />
            <div className={`full-width min-height-600 white border-radius-10 top-margin-30 box-shadow-less2`}>
                <div className="height-50 full-width border-bottom-gray display-flex">
                    <Tab onClick={() => setTab(1)} className={`${tab === 1 ? 'active-tab' : ''} full-height size-pointnine-rem cursor-pointer left-padding-80 right-padding-100 display-flex align-items-center`}>
                        LOGS
                    </Tab>
                    <Tab onClick={() => setTab(2)} className={`${tab === 2 ? 'active-tab' : ''} full-height size-pointnine-rem cursor-pointer left-padding-80 right-padding-100 display-flex align-items-center`}>
                        DELIVERY REPORT
                    </Tab>
                </div>
                <div className="padding-30 full-width border-box">
                    {document.logs ?
                        document.logs?.map((log, index) =>
                            <Log log={log} />)
                        : "Loading ...."}
                </div>
            </div>
        </div>
    )
}

const BackButton = styled.div`
                            width: 200px;
                            left: 0;
                            margin-top: 30px;
                            margin-bottom: -50px;
                            &:hover span {
                                margin-right: 10px;
                            }
                        `;

const Tab = styled.div`
                            &.active-tab {
                                color: #9E7D0A;
                                border-bottom: 1px solid #9E7D0A;
                            }
                        `;

export default DocumentInstance;