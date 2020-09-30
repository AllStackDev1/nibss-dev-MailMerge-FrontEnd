import { documentActions } from "actions/documentActions";
import { getColor } from "helpers/getColor";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ModalContainer from "./modals/ModalContainer";
import SignDocument from "./modals/SignDocument";

const AppendSignature = ({ user }) => {
    const [document, setDocument] = useState({});
    const [documentSignature, setDocumentSignature] = useState("");
    const [modal, setModal] = useState(false);
    const documents = useSelector(state => state.document);

    const { documentId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        function setDocumentData(document) {
            setDocument(document);
        }

        if (document._id === undefined) {
            if (documents.document) {
                if (JSON.stringify(documents.document) !== JSON.stringify(document)) {
                    setDocumentData(documents.document);
                }
            } else {
                if (documents.fetchingSingle === false) {
                    dispatch(documentActions.fetchSingle(documentId));
                }
            }
        }
    });

    const signDocument = () => {
        dispatch(documentActions.signDocument({
            documentId: document.document._id,
            signature: documentSignature
        }));
    }

    return (
        <>
            {modal !== false ?
                <ModalContainer closeModal={() => setModal(false)}>
                    {modal === "sign-document" ?
                        <SignDocument
                            user={user}
                            setModal={setModal}
                            closeModal={() => setModal(false)}
                            signingDocument={documents.signingDocument}
                            documentSignature={documentSignature}
                            setDocumentSignature={setDocumentSignature}
                            signDocument={signDocument} />
                        : ""}
                </ModalContainer>
                : ""}
            <div className={`full-width full-height overflow-scroll-y custom-scrollbar`}>
                <div className={`onboarding display-flex flex-direction-column align-items-center bottom-padding-50 smooth overflow-hidden width-70-percent margin-auto top-margin-70 bottom-margin-5-percent border-box top-padding-50 white border-radius-10 box-shadow-less2`}>
                    {!document.document ?
                        <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>
                        :
                        <>
                            <b className="size-pointnine-rem">Sign this document</b>
                            <div className="max-width-90-percent top-margin-30">
                                <img src={document.document.file} className="max-height-700 full-width" alt="NIBSS PDF" />
                                {document.document.signatories.filter(signatory => signatory.email === user.data.email).map((signatory, index) =>
                                    <div onClick={() => setModal("sign-document")} key={index} className="width-150 height-35 absolute cursor-pointer" style={{ left: signatory.x_coordinate, top: signatory.y_coordinate, backgroundColor: getColor(user.data.name) }}></div>
                                )}
                            </div>
                        </>}
                </div>
            </div>
        </>
    )
}


const Loader = styled.div`
                    width: 40px;
                    height: 40px;
                    & > div {
                        width: 40px;
                        height: 40px;
                        border-color: #9E7D0A transparent transparent transparent
                    }
                `;

export default AppendSignature;