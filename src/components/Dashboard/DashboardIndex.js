import React from "react"
import styled from "styled-components"
import DashboardDocument from "./snippets/DashboardDocument";
import Pagination from "./snippets/Pagination";
import PageTitle from "./snippets/PageTitle";

const DashboardIndex = () => {
    return (
        <div className="full-width full-height custom-scrollbar overflow-auto-y border-box left-padding-30 right-padding-30">
            <PageTitle
                title="Summary"
                breadcrumb="Analytics"
            />
            <Cards className="full-width display-flex space-between">
                <Card className="padding-20 border-box">
                    <div className="full-width display-flex space-between align-items-center">
                        <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/analytics/all-documents.svg`)} className="height-20" alt="NIBSS Empty" />
                        </div>
                        <span className="bold size-two-rem">143</span>
                    </div>
                    <p className="absolute bottom-20 left-20 bold size-pointeight-rem">All Documents</p>
                </Card>
                <Card className="padding-20 border-box">
                    <div className="full-width display-flex space-between align-items-center">
                        <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/analytics/archived-documents.svg`)} className="height-20" alt="NIBSS Empty" />
                        </div>
                        <span className="bold size-two-rem">25</span>
                    </div>
                    <p className="absolute bottom-20 left-20 bold size-pointeight-rem">Archived Documents</p>
                </Card>
                <Card className="padding-20 border-box">
                    <div className="full-width display-flex space-between align-items-center">
                        <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/analytics/signed-documents.svg`)} className="height-25" alt="NIBSS Empty" />
                        </div>
                        <span className="bold size-two-rem">25</span>
                    </div>
                    <p className="absolute bottom-20 left-20 bold size-pointeight-rem">Signed Documents</p>
                </Card>
                <Card className="padding-20 border-box">
                    <div className="full-width display-flex space-between align-items-center">
                        <div className="width-50 height-50 border-radius-100-percent display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/analytics/pending-documents.svg`)} className="height-25" alt="NIBSS Empty" />
                        </div>
                        <span className="bold size-two-rem">25</span>
                    </div>
                    <p className="absolute bottom-20 left-20 bold size-pointeight-rem">Pending Document</p>
                </Card>
            </Cards>
            <SubSectionTitle className="top-margin-50 bold size-pointnine-rem bottom-margin-20">
                Recently uploaded documents
            </SubSectionTitle>
            <DashboardDocument />
            <DashboardDocument />
            <DashboardDocument />
            <DashboardDocument />
            <DashboardDocument />
            <DashboardDocument />
            <DashboardDocument />
            <DashboardDocument />
            <Pagination />
        </div>
    )
}

const Cards = styled.div`
                        margin-top: 30px;
                        &>div {
                            width: calc((100% - 45px) / 4);
                            height: 130px;
                            background: #FFF;
                            border-radius: 10px;
                        }
                    `;

const Card = styled.div`
                        &:first-of-type>div>div {
                            background: rgba(251, 185, 0, 0.3);
                        }
                        &:nth-of-type(2)>div>div {
                            background: rgba(93, 38, 132, 0.3);
                        }
                        &:nth-of-type(3)>div>div {
                            background: rgba(67, 207, 89, 0.3);
                        }
                        &:nth-of-type(4)>div>div {
                            background: rgba(51, 110, 214, 0.3);
                        }
                    `;

const SubSectionTitle = styled.p`
                        color: #182538;
                    `;

export default DashboardIndex;