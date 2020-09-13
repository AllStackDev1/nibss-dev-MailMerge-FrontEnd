import React from 'react'
import styled from 'styled-components'

const Pagination = () => {
    return (
        <div className="full-width display-flex height-50 align-items-center justify-center bottom-padding-30 top-padding-20 no-select">
            <span className="material-icons light-gray-color right-margin-5 cursor-pointer">chevron_left</span>
            <span className="light-gray-color right-margin-30 size-pointeight-rem cursor-pointer">Previous</span>
            <Page className="border-radius-100-percent active-page">1</Page>
            <Page className="border-radius-100-percent">2</Page>
            <Page className="border-radius-100-percent">3</Page>
            <Page className="border-radius-100-percent">4</Page>
            <span className="light-gray-color left-margin-30 size-pointeight-rem cursor-pointer">Next</span>
            <span className="material-icons light-gray-color left-margin-5 cursor-pointer">chevron_right</span>
        </div>
    );
}

const Page = styled.p`
                        width: 30px;
                        height: 30px;
                        background: #FFF;
                        border: 1px solid;
                        border-color: #FFF;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        color: #898D92;
                        &:hover {
                            border-color: #9E7D0A;
                            color: #9E7D0A;
                        }
                        &.active-page {
                            border-color: #9E7D0A;
                            background: #9E7D0A;
                            color: #FFF;
                        }
                        &:not(:last-of-type) {
                            margin-right: 5px;
                        }
                    `;

export default Pagination