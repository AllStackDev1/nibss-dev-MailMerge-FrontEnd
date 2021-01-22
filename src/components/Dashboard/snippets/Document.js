import React from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'

const Document = ({ document, dashboard, viewDocument, viewStats }) => {
    return (
        <Container
            onClick={() => viewDocument(document)}
            className={`cursor-pointer 
                smooth-slow 
                height-90 
                full-width 
                border-radius-7 
                white 
                bottom-margin-20 
                display-flex 
                align-items-center
                space-between`}
            data-testid="container-parent"
        >
            <div className="no-shrink width-70">
                {dashboard ?
                    <img src={require(`images/icons/dashboard/pdf.svg`)} className="height-30 right-margin-20 left-margin-30" alt="NIBSS PDF" />
                    :
                    <img src={require(`images/icons/dashboard/document.svg`)} className="height-25 top-margin-3 right-margin-20 left-margin-30" alt="NIBSS PDF" />
                }
            </div>
            <div className="no-shrink width-25-percent size-pointnine-rem bold word-wrap">
                {document.documentTitle}
            </div>
            <div className="no-shrink width-15-percent size-pointnine-rem bold">
                <p className="size-pointseven-rem light">Created at</p>
                <p className="size-pointeight-rem bold">
                    <Moment format="h:mma Do MMM, YYYY">{document.createdAt}</Moment>
                </p>
            </div>
            <div className="no-shrink width-15-percent size-pointnine-rem bold">
                <p className="size-pointseven-rem light">Owner</p>
                <p className="size-pointeight-rem bold">You</p>
            </div>
            <div className="width-15-percent size-pointnine-rem bold">
                <p className="size-pointseven-rem light">Sent to</p>
                <p className="size-pointeight-rem bold">Me & Other</p>
            </div>
            <Status className={`${document.signed ? 'active-status' : ''} no-shrink height-35 width-100 right-margin-20 border-box border-radius-5`}>
                <div></div>
                <p>{document.signed ? 'Signed' : 'Pending'}</p>
            </Status>
            <ViewDocumentButton
                onClick={e => viewStats(e, document)}
                className={`no-shrink
                    height-35
                    right-margin-40
                    border-box
                    border-radius-5
                    size-pointeight-rem
                    no-wrap
                    display-flex
                    align-items-center
                    justify-center`}>
                VIEW DOCUMENT
            </ViewDocumentButton>
        </Container>
    )
}

const Container = styled.div`
    &:hover {
        opacity: 0.6;
    }
`;

const ViewDocumentButton = styled.div`
    background: #C5FCDF;
    color: #1ADC76;
    min-width: 100px;
    padding-left: 15px;
    padding-right: 15px;
`;

const Status = styled.div`background: #CCC;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &.active-status {
                            background: #C5FCDF;
                        }
                        &>div {
                            border-radius: 100%;
                            background: #FFF;
                            width: 8px;
                            height: 8px;
                            margin-right: 10px;
                        }
                        &.active-status>div {
                            background: #1ADC76;
                        }
                        &>p {
                            color: #FFF;
                            font-size: 0.8rem;
                        }
                        &.active-status>p {
                            color: #1ADC76;
                        }
                        `;

export default Document;
