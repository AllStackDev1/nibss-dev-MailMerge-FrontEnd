import React from 'react'
import { Card } from 'styles/styled-components/DashboardCards'
import Loader from 'styles/styled-components/Loader';

const DashboardCard = ({ documents, image, key, label }) => (
    <Card className="padding-20 border-box">
        <div className="full-width display-flex space-between align-items-center">
            <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                <img src={image} className="height-20" alt="NIBSS Empty" />
            </div>
            {documents?.documents && documents.fetching !== true ?
                <span className="bold size-two-rem">{documents?.documents?.[key] || 0}</span>
                :
                <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>}
        </div>
        <p className="absolute bottom-20 left-20 bold size-pointeight-rem">{label}</p>
    </Card>
)

export default DashboardCard;
