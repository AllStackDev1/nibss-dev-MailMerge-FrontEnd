import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Toolbox = ({ tag, viewTags, closeTags, viewingTags, exportButton, addButtonText, addButtonUrl, setModal }) => {
    const [filter, setFilter] = useState({});

    const onChange = event => {
        const { name, value } = event.target;

        setFilter({
            ...filter,
            [name]: value
        });
    }

    return (
        <ToolBox className="full-width top-margin-30 bottom-margin-5 display-flex space-between">
            <div className="width-40-percent display-flex align-items-center">
                <input type="text" name="search" onChange={onChange} value={filter.search} className={`${filter.search !== undefined && filter.search !== "" ? "has-value" : ""} toolbox-input no-border no-outline no_bg smooth`} placeholder="Search" />
                <span className="material-icons smooth">search</span>
                <div className="smooth"></div>
            </div>
            <div className="display-flex no-select">
                <div className="display-flex align-items-center justify-center cursor-pointer left-padding-15 right-padding-15 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color right-margin-20">
                    <img src={require(`images/icons/dashboard/filter.svg`)} className={`height-15 right-margin-10`} alt="Filter" />
                    Filter
                </div>
                {exportButton === true ?
                    <div className="display-flex align-items-center justify-center cursor-pointer left-padding-15 right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color right-margin-50">
                        Export as
                        <span className="material-icons mustard-color left-margin-0">arrow_drop_down</span>
                    </div>
                    : ""}
                {tag === true ?
                    <ActionButton onClick={() => { viewingTags ? closeTags() : viewTags() }} className={`${viewingTags ? 'active-button' : ''} smooth display-flex align-items-center justify-center cursor-pointer left-padding-15 right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color right-margin-50`}>
                        View Tags
                    </ActionButton>
                    : ""}
                {addButtonUrl ?
                    <Link to={addButtonUrl}>
                        <button className="uppercase left-padding-20 right-padding-20 height-35 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                            {addButtonText}
                        </button>
                    </Link>
                    :
                    <button onClick={() => setModal("add-recipient")} className="uppercase left-padding-20 right-padding-20 height-35 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                        {addButtonText}
                    </button>}
            </div>
        </ToolBox>
    )
}

const ToolBox = styled.div`
                            &>div:first-of-type span {
                                color: #919AA3;
                            }
                            & input::placeholder {
                                font-size: 0.9rem;
                                color: #919AA3;
                            }
                            & input:focus::placeholder {
                                color: #CCC;
                            }
                            & div:first-of-type > div {
                                width: 0;
                                position: absolute;
                                left: 30px;
                                height: 1px;
                                background: #9E7D0A;
                                bottom: 0;
                            }
                        `;

const ActionButton = styled.div`
                            &.active-button {
                                background: #9E7D0A !important;
                                color: #FFF !important;
                            }
                        `;

export default Toolbox;