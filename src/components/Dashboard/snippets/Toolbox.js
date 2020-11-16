import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { recipientActions } from 'actions/recipientActions';

const Toolbox = ({ user,
    search,
    onChange,
    filter,
    setFilter,
    filterList,
    addFilter,
    removeFilter,
    tag,
    upload,
    adding,
    viewTags,
    closeTags,
    viewingTags,
    exportButton,
    addButtonText,
    addButtonUrl,
    setModal,
    parseCSV,
    exportDocument,
    downloading }) => {
    const dispatch = useDispatch();

    const recipients = useSelector(state => state.recipient);
    const userLabel = "user";
    const rightMargin50 = 'right-margin-50';

    useEffect(() => {
        if (filterList === undefined) {
            dispatch(recipientActions.fetchTags());
        }
    }, [dispatch, filterList]);

    const viewTagsClass = () => {
        if (upload === true) {
            return 'right-margin-20';
        }

        return rightMargin50
    }

    const renderDownloading = () => {
        if (downloading) {
            return <ExportLoader className="lds-ring"><div></div><div></div><div></div><div></div></ExportLoader>
        }

        return <span className="material-icons mustard-color left-margin-0">arrow_drop_down</span>
    }

    const renderFilterList = () => {
        if (filterList) {
            return filterList.map((t, index) =>
                <div
                    key={index}
                    onClick={() => filter === t ? setFilter("") : setFilter(t)}
                    className="smooth capitalize display-flex align-items-center bottom-margin-10">
                    <div className="width-30 right-margin-10">
                        <input readOnly type="checkbox" id={`tag-${index}`} checked={filter === t} className="checkbox-s" />
                        <label htmlFor={`tag-${index}`} className="no-shrink"></label>
                    </div>
                    {t}
                </div>
            )
        }

        if (recipients.tags) {
            return recipients.tags.map((t, index) =>
                <div
                    key={index}
                    onClick={() => filter.includes(t.name) ? removeFilter(t.name) : addFilter(t.name)}
                    className="smooth display-flex align-items-center bottom-margin-10">
                    <div className="width-30 right-margin-10">
                        <input readOnly type="checkbox" id={`tag-${index}`} checked={filter.includes(t.name)} className="checkbox-s" />
                        <label htmlFor={`tag-${index}`} className="no-shrink"></label>
                    </div>
                    {t.name}
                </div>
            )
        } else {
            return <div className="height-200 full-width display-flex align-items-center justify-center">
                <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>
            </div>
        }
    }

    const renderAdditionText = () => {
        if (adding) {
            return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        }

        return <span>Upload CSV</span>;
    }

    const renderRecipientButton = () => {
        if (addButtonUrl) {
            return <Link to={addButtonUrl}>
                <button
                    className="uppercase left-padding-20 right-padding-20 height-35 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                    {addButtonText}
                </button>
            </Link>
        }

        return <button
            onClick={() => setModal("add-recipient")}
            className="uppercase left-padding-20 right-padding-20 height-35 mustard white-color border-radius-2 display-flex justify-center align-items-center">
            {addButtonText}
        </button>
    }

    return (
        <ToolBox className="full-width top-margin-30 bottom-margin-5 display-flex space-between">
            <div className="width-40-percent display-flex align-items-center">
                <input
                    type="text"
                    name="search"
                    onChange={onChange}
                    value={search.search || ""}
                    className={`
                        ${search.search !== undefined && search.search !== "" ? "has-value" : ""} 
                        toolbox-input no-border no-outline no_bg smooth`
                    }
                    placeholder="Search" />
                <span className="material-icons smooth">search</span>
                <div className="smooth"></div>
            </div>
            <div className="display-flex no-select">
                <Menu
                    className={`
                        display-flex 
                        align-items-center 
                        justify-center 
                        cursor-pointer 
                        left-padding-15 
                        right-padding-15 
                        white 
                        border-radius-5 
                        box-shadow-less2 
                        size-pointeight-rem 
                        mustard-color 
                        right-margin-20`
                    }>
                    <img src={require(`images/icons/dashboard/filter.svg`)} className={`height-15 right-margin-10`} alt="Filter" />
                    Filter
                    <div className="top-padding-10">
                        <div className="box-shadow-less2 border-radius-10 padding-10 white">
                            {renderFilterList()}
                        </div>
                    </div>
                </Menu>
                {exportButton === true ?
                    <Menu
                        className={`display-flex 
                        align-items-center 
                        justify-center 
                        cursor-pointer 
                        left-padding-15 
                        right-padding-10 
                        white 
                        border-radius-5 
                        box-shadow-less2 
                        size-pointeight-rem 
                        mustard-color 
                        ${user?.data?.role !== userLabel && rightMargin50}`}>
                        Export as
                        {renderDownloading()}
                        <div className="top-padding-10">
                            <div className="box-shadow-less2 border-radius-10 padding-10 white min-width-100">
                                <div onClick={() => exportDocument('csv')} className="smooth display-flex align-items-center bottom-margin-10">
                                    CSV
                                </div>
                                <div onClick={() => exportDocument('pdf')} className="smooth display-flex align-items-center bottom-margin-10">
                                    PDF
                                </div>
                            </div>
                        </div>
                    </Menu>
                    : ""}
                {tag === true ?
                    <ActionButton
                        onClick={() => { viewingTags ? closeTags() : viewTags() }}
                        className={`${viewingTags && 'active-button'} 
                            ${viewTagsClass()} 
                            smooth 
                            display-flex 
                            align-items-center 
                            justify-center 
                            cursor-pointer 
                            left-padding-15 
                            right-padding-10 
                            white 
                            border-radius-5 
                            box-shadow-less2 
                            size-pointeight-rem 
                            mustard-color`}>
                        View Tags
                    </ActionButton>
                    : ""}
                {upload === true ?
                    <>
                        <ActionButton
                            onClick={() => { document.getElementById('csv_file').click() }}
                            className={`
                                ${adding && 'active-button width-80'} 
                                smooth 
                                display-flex 
                                align-items-center 
                                justify-center 
                                cursor-pointer 
                                left-padding-15 
                                right-padding-10 
                                white 
                                border-radius-5 
                                box-shadow-less2 
                                size-pointeight-rem 
                                mustard-color 
                                ${user?.data?.role !== userLabel && rightMargin50}`
                            }>
                            {renderAdditionText()}
                        </ActionButton>
                        <input
                            type="file"
                            name="csv_file"
                            id="csv_file"
                            accept=".csv"
                            onChange={parseCSV}
                            className="width-0 height-0 border-box hide" />
                    </>
                    : ""}
                {user?.data?.role !== userLabel ?
                    renderRecipientButton()
                    : ""}
            </div>
        </ToolBox>
    )
}

const Menu = styled.div`&>div:not(.lds-ring){
    display: none;
    position: absolute;
    left: 0;
    top: 30px;
    z-index: 1;
}
&>div:not(.lds-ring)>div{
    min-width: 200px;
    background: #FFF !important;
    white-space: nowrap;
    padding-right: 25px !important;
}
&:hover>div{
    display: block;
}
&>div:not(.lds-ring)>div>div:hover{
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

const ExportLoader = styled.div`
                        width: 20px;
                        height: 20px;
                        margin-left: 10px;
                        & > div {
                            width: 20px;
                            height: 20px;
                            border-color: #9E7D0A transparent transparent transparent
                        }
                    `;

export default Toolbox;
