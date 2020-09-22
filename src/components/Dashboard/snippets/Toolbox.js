import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { recipientActions } from 'actions/recipientActions';

const Toolbox = ({ search, onChange, filter, setFilter, filterList, addFilter, removeFilter, tag, upload, adding, viewTags, closeTags, viewingTags, exportButton, addButtonText, addButtonUrl, setModal, parseCSV }) => {
    const dispatch = useDispatch();

    const recipients = useSelector(state => state.recipient);

    useEffect(() => {
        if (filterList === undefined) {
            dispatch(recipientActions.fetchTags());
        }
    }, [dispatch, filterList]);

    return (
        <ToolBox className="full-width top-margin-30 bottom-margin-5 display-flex space-between">
            <div className="width-40-percent display-flex align-items-center">
                <input type="text" name="search" onChange={onChange} value={search.search || ""} className={`${search.search !== undefined && search.search !== "" ? "has-value" : ""} toolbox-input no-border no-outline no_bg smooth`} placeholder="Search" />
                <span className="material-icons smooth">search</span>
                <div className="smooth"></div>
            </div>
            <div className="display-flex no-select">
                <Menu className="display-flex align-items-center justify-center cursor-pointer left-padding-15 right-padding-15 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color right-margin-20">
                    <img src={require(`images/icons/dashboard/filter.svg`)} className={`height-15 right-margin-10`} alt="Filter" />
                    Filter
                    <div className="top-padding-10">
                        <div className="box-shadow-less2 border-radius-10 padding-10 white">
                            {filterList ?
                                filterList.map((tag, index) =>
                                    <div key={index} onClick={() => filter === tag ? setFilter("") : setFilter(tag)} className="smooth capitalize display-flex align-items-center bottom-margin-10">
                                        <div className="width-30 right-margin-10">
                                            <input readOnly type="checkbox" id={`tag-${index}`} checked={filter === tag} className="checkbox-s" />
                                            <label htmlFor={`tag-${index}`} className="no-shrink"></label>
                                        </div>
                                        {tag}
                                    </div>
                                )
                                :
                                recipients.tags ?
                                    recipients.tags.map((tag, index) =>
                                        <div key={index} onClick={() => filter.includes(tag.name) ? removeFilter(tag.name) : addFilter(tag.name)} className="smooth display-flex align-items-center bottom-margin-10">
                                            <div className="width-30 right-margin-10">
                                                <input readOnly type="checkbox" id={`tag-${index}`} checked={filter.includes(tag.name)} className="checkbox-s" />
                                                <label htmlFor={`tag-${index}`} className="no-shrink"></label>
                                            </div>
                                            {tag.name}
                                        </div>
                                    )
                                    :
                                    <div className="height-200 full-width display-flex align-items-center justify-center">
                                        <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>
                                    </div>
                            }
                        </div>
                    </div>
                </Menu>
                {exportButton === true ?
                    <div className="display-flex align-items-center justify-center cursor-pointer left-padding-15 right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color right-margin-50">
                        Export as
                        <span className="material-icons mustard-color left-margin-0">arrow_drop_down</span>
                    </div>
                    : ""}
                {tag === true ?
                    <ActionButton onClick={() => { viewingTags ? closeTags() : viewTags() }} className={`${viewingTags ? 'active-button' : ''} ${upload === true ? 'right-margin-20' : 'right-margin-50'} smooth display-flex align-items-center justify-center cursor-pointer left-padding-15 right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color`}>
                        View Tags
                    </ActionButton>
                    : ""}
                {upload === true ?
                    <>
                        <ActionButton onClick={() => { document.getElementById('csv_file').click() }} className={`${adding ? 'active-button width-80' : ''} smooth display-flex align-items-center justify-center cursor-pointer left-padding-15 right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color right-margin-50`}>
                            {adding ?
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                :
                                'Upload CSV'}
                        </ActionButton>
                        <input type="file" name="csv_file" id="csv_file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={parseCSV} className="width-0 height-0 border-box hide"></input>
                    </>
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

const Menu = styled.div`&>div{
    display: none;
    position: absolute;
    left: 0;
    top: 30px;
    z-index: 1;
}
&>div>div{
    min-width: 200px;
    background: #FFF !important;
    white-space: nowrap;
    padding-right: 25px !important;
}
&:hover>div{
    display: block;
}
&>div>div>div:hover{
    opacity: 0.5
}
`;

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
                            & > div:first-of-type > div {
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


const Loader = styled.div`
                        width: 40px;
                        height: 40px;
                        & > div {
                            width: 40px;
                            height: 40px;
                            border-color: #9E7D0A transparent transparent transparent
                        }
                    `;

export default Toolbox;