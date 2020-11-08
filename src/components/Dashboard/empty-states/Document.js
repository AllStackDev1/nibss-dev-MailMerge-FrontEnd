import React from 'react'
import styled from 'styled-components'
import EmptyPagination from './Pagination';

const EmptyDocument = () => {
    return (
        <>
            {[...Array(8)].map((item, index) =>
                <div key={index} className="height-90 full-width border-radius-7 white bottom-margin-20 display-flex align-items-center space-between">
                    <div className="no-shrink width-70">
                        <img src={require(`images/icons/dashboard/document.svg`)} className="height-25 top-margin-3 right-margin-20 left-margin-30" alt="NIBSS PDF" />
                    </div>
                    <div className="no-shrink width-25-percent size-pointnine-rem bold">
                        <div className="height-25 width-90-percent border-radius-10 light-gray"></div>
                    </div>
                    <div className="no-shrink width-15-percent size-pointnine-rem bold">
                        <div className="height-10 width-70-percent border-radius-10 light-gray bottom-margin-10"></div>
                        <div className="height-15 width-90-percent border-radius-10 light-gray"></div>
                    </div>
                    <div className="no-shrink width-15-percent size-pointnine-rem bold">
                        <div className="height-10 width-60-percent border-radius-10 light-gray bottom-margin-10"></div>
                        <div className="height-15 width-50-percent border-radius-10 light-gray"></div>
                    </div>
                    <div className="no-shrink width-15-percent size-pointnine-rem bold">
                        <div className="height-10 width-50-percent border-radius-10 light-gray bottom-margin-10"></div>
                        <div className="height-15 width-70-percent border-radius-10 light-gray"></div>
                    </div>
                    <Status className="no-shrink height-35 width-100 right-margin-50 border-box border-radius-5">

                    </Status>
                </div>
            )}
            <EmptyPagination />
        </>
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

export default EmptyDocument;
