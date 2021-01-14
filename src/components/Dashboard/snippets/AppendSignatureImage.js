import React from 'react';
import Trigger from "./append-signature/Trigger";
import styled from 'styled-components';
import { getImageSize } from 'helpers';
import decode from 'jwt-decode';

const AppendSignatureImage = ({ imageRef, isNumPagesSet, width75percent, document, setImageError, setDocument,
    user, userToken, signDocumentConst, setModal }) => {
    const calculateOffset = async e => {
        const imageSize = await getImageSize(e.target);

        document.document.signatories.forEach((signatory, i) => {
            const documentCopy = Object.assign({}, document);
            documentCopy.document.signatories[i] = {
                ...signatory,
                absolute_x_coordinate: (signatory.x_coordinate / imageSize.width) * imageRef.current.offsetWidth,
                absolute_y_coordinate: (signatory.y_coordinate / imageSize.height) * imageRef.current.offsetHeight
            }
            setDocument(documentCopy);
        })
    }

    return (
        <PageContainer className={`${isNumPagesSet ? width75percent : ''}`}>
            <img ref={imageRef} onLoad={calculateOffset} onError={() => setImageError(true)} src={document?.document.file}
                className="full-width right-margin-10" alt="NIBSS Upload Document" />
            {document?.document.signatories
                .filter(signatory => signatory.email === (user?.data?.email || decode(userToken)?.data?.email))
                .map((signatory, index) =>
                    signatory.absolute_x_coordinate !== undefined ?
                        <Trigger signatory={signatory} signDocumentConst={signDocumentConst} index={index} setModal={setModal}
                            user={user} userToken={userToken} />
                        : <div></div>
                )}
        </PageContainer>
    )
}

const PageContainer = styled.div`
                border: 1px solid #CCC !important;
                &:hover {
                    border: 1px dashed #d8d8d8 !important;
                }
            `;

export default AppendSignatureImage;
