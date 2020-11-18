import React from 'react'
import { Tabs, Tab } from 'styles/styled-components/DocumentTabs'

const DocumentTabs = ({ fetch, tab, setTab, documents, fetching }) => {
    const activeTabClass = 'active-tab';
    const tabClasses = `width-25-percent cursor-pointer size-pointeightfive-rem display-flex align-items-center justify-center`;

    const renderTabStats = (tabArg, key, total) => {
        if (documents?.documents) {
            const notTotal = tab === tabArg && fetching === false ?
                documents?.documents?.document_stats?.[key]
                : "";

            const statValue = tab === tabArg && fetching === false && total ?
                documents?.documents[key] : notTotal;

            if (statValue !== "") {
                return <span className="left-padding-5">{`(${statValue || 0})`}</span>
            }

            return <span></span>;
        }

        return <span></span>;
    }

    return (
        <Tabs className="height-60 full-width display-flex no-select">
            <Tab
                onClick={() => {
                    fetch();
                    setTab(1)
                }}
                className={`${tab === 1 && activeTabClass} ${tabClasses}`}>
                All Documents {renderTabStats(1, 'total_documents', true)}
                <div className="full-width height-0 smooth"></div>
            </Tab>
            <Tab
                onClick={() => {
                    fetch("pending");
                    setTab(2)
                }}
                className={`${tab === 2 && activeTabClass} ${tabClasses}`}>
                Pending Documents {renderTabStats(2, 'pending_document')}
                <div className="full-width height-0 smooth"></div>
            </Tab>
            <Tab
                onClick={() => {
                    fetch("signed");
                    setTab(3)
                }}
                className={`${tab === 3 && activeTabClass} ${tabClasses}`}>
                Signed Documents {renderTabStats(3, 'signed_document')}
                <div className="full-width height-0 smooth"></div>
            </Tab>
            <Tab
                onClick={() => {
                    fetch("rejected");
                    setTab(4)
                }}
                className={`${tab === 4 && activeTabClass} ${tabClasses}`}>
                Rejected Documents {renderTabStats(4, 'rejected_document')}
                <div className="full-width height-0 smooth"></div>
            </Tab>
        </Tabs>)
}

export default DocumentTabs;
