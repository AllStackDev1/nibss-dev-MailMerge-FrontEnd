import React from 'react'
import EmptyPagination from './EmptyPagination';

const EmptyDocumentRecipient = () => {
    return (
        <>
            {[...Array(8)].map((item, index) =>
                <div key={index} className="display-flex full-width align-items-center right-padding-50 border-box bottom-margin-20">
                    <div className="right-margin-5 height-25 width-25 light-gray border-radius-5">

                    </div>
                    <div className="no-shrink width-40 height-40 right-margin-40 border-radius-100-percent light-gray left-margin-20"></div>
                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                        <div className="height-20 width-90-percent border-radius-10 light-gray"></div>
                    </div>
                    <div className="no-shrink width-30-percent size-pointeight-rem">
                        <div className="height-20 width-90-percent border-radius-10 light-gray"></div>
                    </div>
                </div>
            )}
            <EmptyPagination />
        </>
    )
}

export default EmptyDocumentRecipient;
