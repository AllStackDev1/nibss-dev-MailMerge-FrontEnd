import React from 'react';
import styled from 'styled-components'

const Pagination = ({ data, viewPage }) => {
    return (
        <div className="full-width display-flex height-50 align-items-center justify-center bottom-padding-30 top-padding-20 no-select">
            <span className="material-icons light-gray-color right-margin-5 cursor-pointer">chevron_left</span>
            <span className="light-gray-color right-margin-30 size-pointeight-rem cursor-pointer">Previous</span>
            {data ?
                data.pagination ?
                    data.pagination.number_of_pages !== undefined ?
                        [...Array(data.pagination.number_of_pages < 3 ? 3 : data.pagination.number_of_pages)].map((item, index) =>
                            <Page key={index} onClick={() => viewPage(index + 1)} className={`border-radius-100-percent ${index + 1 === data.pagination.current && 'active-page'} ${index + 1 > data.pagination.number_of_pages ? 'opacity-0-5' : 'cursor-pointer'}`}>{index + 1}</Page>
                        )
                        : ''
                    : ''
                : ''
            }
            <span className="light-gray-color left-margin-30 size-pointeight-rem cursor-pointer">Next</span>
            <span className="material-icons light-gray-color left-margin-5 cursor-pointer">chevron_right</span>
        </div>
    )
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

export default Pagination;