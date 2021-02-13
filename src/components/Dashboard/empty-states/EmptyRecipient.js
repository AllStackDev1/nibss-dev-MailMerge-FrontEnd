import React from 'react'
import styled from 'styled-components'
import EmptyPagination from './EmptyPagination';

const EmptyRecipient = () => {
    return (
        <>
            {[...Array(8)].map((item, index) =>
                <RecipientInstance key={index} className="smooth height-80 full-width border-radius-10 white display-flex align-items-center space-between">
                    <div
                        url={require(`images/icons/dashboard/profile.png`)}
                        className="no-shrink width-40 height-40 right-margin-20 border-radius-100-percent left-margin-10 light-gray"></div>
                    <div className="no-shrink width-25-percent size-pointeight-rem bold">
                        <div className="height-25 width-90-percent border-radius-10 light-gray"></div>
                    </div>
                    <div className="no-shrink width-20-percent size-pointeight-rem">
                        <div className="height-25 width-90-percent border-radius-10 light-gray"></div>
                    </div>
                    <div className="no-shrink width-20-percent right-padding-20 left-padding-20 size-pointeight-rem display-flex justify-center flex-wrap">
                        <Tag className="width-70 height-25"></Tag>
                        <Tag className="width-50 height-25"></Tag>
                        <Tag className="width-70 height-25"></Tag>
                    </div>
                    <Status className="active no-shrink height-25 width-100 right-margin-50 border-box border-radius-20"></Status>
                    <div className="no-shrink width-50 size-pointeight-rem right-margin-30">
                        <img src={require(`images/icons/dashboard/more.svg`)} className="height-5 right-margin-20 left-margin-30" alt="NIBSS PDF" />
                    </div>
                </RecipientInstance>
            )}
            <EmptyPagination />
        </>
    )
}

const RecipientInstance = styled.div`
                                cursor: pointer;
                                &:hover{
                                    background: #F2F6F9 !important;
                                }
                                `;

const Tag = styled.p`
                        background: #E8E8E8;
                        border-radius: 5px;
                        font-size: 0.7rem;
                        color: #182538;
                        &:not(:last-of-type) {
                            margin-right: 10px;
                        }
                    `;

const Status = styled.div`background: #85D9BF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &>div {
                            border-radius: 100%;
                            width: 8px;
                            height: 8px;
                            margin-right: 10px;
                        }
                        &>div.active {
                            background: #85D9BF;
                        }
                        &>p {
                            color: #FFF;
                            font-size: 0.8rem;
                        }
                        `;

export default EmptyRecipient;
