import React from 'react'
import { Cards } from 'styles/styled-components/DashboardCards';
import DashboardCard from './Card'

const DashboardCards = ({ documents }) => (
    <Cards className="full-width display-flex space-between">
        <DashboardCard
            image={require(`images/icons/dashboard/analytics/all-documents.svg`)}
            documents={documents}
            keyed={"total_documents"}
            label="All Documents" />
        <DashboardCard
            image={require(`images/icons/dashboard/analytics/archived-documents.svg`)}
            documents={documents}
            keyed={"archived_document"}
            label="Archived Documents" />
        <DashboardCard
            image={require(`images/icons/dashboard/analytics/signed-documents.svg`)}
            documents={documents}
            keyed={"signed_document"}
            label="Signed Documents" />
        <DashboardCard
            image={require(`images/icons/dashboard/analytics/pending-documents.svg`)}
            documents={documents}
            keyed={"pending_document"}
            label="Pending Document" />
    </Cards>
)

export default DashboardCards;
