import React from 'react'

const EmptySidebar = () => (
    <div className="width-20-percent full-height white box-shadow-less2 padding-20 border-box">
        <img src={require(`images/logo.svg`)} className="height-80 bottom-margin-40" alt="NIBSS logo" />
        <div className="left-padding-20 right-padding-20">
            <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
            <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
            <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
            <div className="height-12 full-width border-radius-10 bottom-margin-50 light-gray"></div>
            <div className="height-12 width-50-percent border-radius-10 bottom-margin-30 light-gray"></div>
            <div className="height-12 width-70-percent border-radius-10 bottom-margin-30 light-gray"></div>
            <div className="height-12 width-70-percent border-radius-10 bottom-margin-30 light-gray"></div>
            <div className="height-12 full-width border-radius-10 light-gray"></div>
        </div>
    </div>
)

export default EmptySidebar;
