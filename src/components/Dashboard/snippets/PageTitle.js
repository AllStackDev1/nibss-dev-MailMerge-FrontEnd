import React from "react"
import styled from "styled-components"

const PageTitle = ({ title, breadcrumb }) => {
    return (
        <>
            <Title className="no-select top-padding-70 size-onepointthree-rem bold">
                {title}
            </Title>
            <BreadCrumbs className="no-select display-flex align-items-center">
                <span className="right-margin-5">Dashboard</span>
                <span className="material-icons">chevron_right</span>
                <span className="left-margin-5">{breadcrumb ? breadcrumb : title}</span>
            </BreadCrumbs>
        </>
    )
};

const Title = styled.p`color: rgba(52, 66, 72, 0.6);`;

const BreadCrumbs = styled.div`
                            &>span:first-of-type, &>span:last-of-type {
                                font-size: 0.8rem;
                            }
                            &>span:not(:last-of-type) {
                                color: rgba(52, 66, 72, 0.6);
                            }
                            &>span:last-of-type {
                                color: #9E7D0A;
                                font-weight: bold;
                            }
                        `;

export default PageTitle;