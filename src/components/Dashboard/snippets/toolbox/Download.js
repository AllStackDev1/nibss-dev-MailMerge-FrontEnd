import React from 'react'
import ToolboxMenu from 'styles/styled-components/ToolboxMenu';

const Download = ({role, userLabel, rightMargin50, renderDownloading, exportDocument}) => (
    <ToolboxMenu
        className={`display-flex 
                    align-items-center 
                    justify-center 
                    cursor-pointer 
                    left-padding-15 
                    right-padding-10 
                    white 
                    border-radius-5 
                    box-shadow-less2 
                    size-pointeight-rem 
                    mustard-color 
                    ${role !== userLabel && rightMargin50}`}>
        Export as
        {renderDownloading()}
        <div className="top-padding-10">
            <div className="box-shadow-less2 border-radius-10 padding-10 white min-width-100">
                <div onClick={() => exportDocument('csv')} className="smooth display-flex align-items-center bottom-margin-10">
                    CSV
                </div>
                <div onClick={() => exportDocument('pdf')} className="smooth display-flex align-items-center bottom-margin-10">
                    PDF
                </div>
            </div>
        </div>
    </ToolboxMenu>
)

export default Download;
