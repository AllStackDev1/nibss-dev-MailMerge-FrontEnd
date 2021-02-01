/* eslint-disable */

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { recipientActions } from "actions/recipientActions";
import EmptyDocumentRecipient from "components/Dashboard/empty-states/DocumentRecipient";
import { getColor } from "helpers/getColor";
import { getInitials } from "helpers/getInitials";

const SetupRecipients = ({ document, addRecipient }) => {
    const [search, setSearch] = useState({
        search: ""
    });
    const [filter, setFilter] = useState([]);
    const [timer, setTimer] = useState();

    const dispatch = useDispatch();

    const recipients = useSelector(state => state.recipient);

    useEffect(() => {
        dispatch(recipientActions.fetchTags());
        dispatch(recipientActions.fetch('document'));
    }, [dispatch]);

    useEffect(() => {
        if (filter.length > 0 || search.search !== "") {
            dispatch(recipientActions.search(search.search, filter, "document"));
        }
    }, [dispatch, filter]);

    const onChangeSearch = event => {
        const { name, value } = event.target;

        setSearch({
            ...search,
            [name]: value
        });

        if (event.target.value !== "") {
            if (timer) {
                clearTimeout(timer);
            }

            setTimer(() => {
                return setTimeout(() => {
                    dispatch(recipientActions.search(value, null, "document"));
                }, 1000);
            });
        }
    }

    const fetchMoreRecipients = e => {
        if ((e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight < 20) {
            if (recipients.fetching === false && (recipients.documentRecipients.pagination.current !== recipients.documentRecipients.pagination.number_of_pages)) {
                dispatch(recipientActions.fetchPage(recipients.documentRecipients.pagination.next, 'document'));
            }
        }
    }

    const renderRecipients = () => {
        if (recipients?.documentRecipients === undefined || recipients.searching) {
            return <EmptyDocumentRecipient />;
        }

        const toLoop = (search.search !== "" || filter.length > 0) && recipients.documentSearchRecipients ?
            recipients.documentSearchRecipients :
            recipients.documentRecipients;

        return (toLoop).data.map((recipient, index) =>
            <div key={index} onClick={() => addRecipient(recipient)} className="cursor-pointer bottom-margin-20">
                <input
                    type="checkbox"
                    id={`recipient-${index}`}
                    className="checkbox-s"
                    checked={document.recipients.findIndex(rec => rec._id === recipient._id) !== -1} data-test="checkbox-input" />
                <label htmlFor={`recipient-${index}`} className="no-shrink absolute left center-item-vertically"></label>
                <div className="left-padding-30 display-flex full-width align-items-center right-padding-50 border-box above">
                    <Profile
                        style={{ backgroundColor: getColor(recipient.name) }}
                        className={`
                                        white-color 
                                        display-flex 
                                        align-items-center 
                                        justify-center 
                                        size-pointeight-rem 
                                        bold 
                                        no-shrink 
                                        width-40 
                                        height-40 
                                        right-margin-40 
                                        border-radius-100-percent 
                                        left-margin-20`}>
                        {getInitials(recipient.name)}
                    </Profile>
                    <div className="no-shrink width-50-percent size-pointeight-rem bold capitalize">
                        {recipient.name}
                    </div>
                    <div className="no-shrink width-30-percent size-pointeight-rem">
                        <p className="size-pointeight-rem light-gray-color truncate">{recipient.email}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">
                Select Recipients
                <span className="light size-pointnine-rem">{document?.recipients.length > 0 ? ` - ${document?.recipients.length} selected` : ""}</span>
            </p>
            <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Tell us who will be getting this documenmts</p>
            <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>
            <div className="display-flex width-85-percent space-between top-margin-30">
                <input type="text" name="search" onChange={onChangeSearch} placeholder="search name" className="height-40 width-250" required />
                <Menu
                    className={`
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
                        right-margin-20`}>
                    <img src={require(`images/icons/dashboard/filter.svg`)} className={`height-15 right-margin-10`} alt="Filter" />
                    Filter By
                    <span className="material-icons">
                        arrow_drop_down
                    </span>
                    <div className="top-padding-10">
                        <div className="box-shadow-less2 border-radius-10 padding-10 white">
                            {recipients?.tags ?
                                recipients.tags.map((tag, index) =>
                                    <div
                                        key={index}
                                        onClick={() => filter.includes(tag.name) ?
                                            setFilter(f => (f.filter(item => item !== tag.name))) :
                                            setFilter(f => ([...f, tag.name]))}
                                        className="smooth display-flex align-items-center bottom-margin-10">
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
            </div>
            <div className="full-height width-85-percent top-margin-40 border-box overflow-auto-y custom-scrollbar" onScroll={fetchMoreRecipients}>
                {renderRecipients()}
            </div>
        </>
    )
}

const Menu = styled.div`
z-index: 999;
&>div{
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

const Profile = styled.div`background-image: url(${props => props.url});
                        background-position: center;
                        background-size: cover;`;

const Loader = styled.div`
                        width: 40px;
                        height: 40px;
                        & > div {
                            width: 40px;
                            height: 40px;
                            border-color: #9E7D0A transparent transparent transparent
                        }
                    `;

export default SetupRecipients;
