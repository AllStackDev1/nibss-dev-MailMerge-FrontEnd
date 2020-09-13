import React from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'

const Document = ({ document }) => {
    return (
        <div className="height-90 full-width border-radius-7 white bottom-margin-20 display-flex align-items-center space-between">
            <div className="no-shrink width-70">
                <img src={require(`images/icons/dashboard/document.svg`)} className="height-25 top-margin-3 right-margin-20 left-margin-30" alt="NIBSS PDF" />
            </div>
            <div className="no-shrink width-25-percent size-pointnine-rem bold">
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
            <div className="no-shrink width-15-percent size-pointnine-rem bold">
                <p className="size-pointseven-rem light">Sent to</p>
                <p className="size-pointeight-rem bold">Me & Other</p>
            </div>
            <Status className="no-shrink height-35 width-100 right-margin-50 border-box border-radius-5">
                <div></div>
                <p>Signed</p>
            </Status>
        </div>
    )
}

const Status = styled.div`background: #C5FCDF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &>div {
                            border-radius: 100%;
                            background: #1ADC76;
                            width: 8px;
                            height: 8px;
                            margin-right: 10px;
                        }
                        &>p {
                            color: #1ADC76;
                            font-size: 0.8rem;
                        }
                        `;

export default Document;