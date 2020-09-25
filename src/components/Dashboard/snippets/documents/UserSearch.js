import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'actions';
import styled from "styled-components";

const UserSearch = ({ selectUser }) => {
    const dispatch = useDispatch();
    const searchInput = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [timer, setTimer] = useState();

    // Connect to data in store
    const users = useSelector(state => state.user);

    const searchUser = (searchParam) => {
        if (searchParam.length > 0) {
            if (timer) {
                clearTimeout(timer);
            }

            setTimer(() => {
                return setTimeout(() => {
                    dispatch(userActions.search(searchParam));
                }, 1000);
            });
        } else {
            if (timer) {
                clearTimeout(timer);
            }
            clearSearchResults();
        }
    }

    const clearSearchResults = () => {
        searchInput.current.blur();
        setSearchTerm("");
        dispatch(userActions.clearSearch());
    }

    return (
        <>
            
                <div className={`input-container form-input no-padding smaller-placeholder above-all ${searchTerm && searchTerm !== "" && "active"}`}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => { searchUser(e.target.value); setSearchTerm(e.target.value) }}
                        ref={searchInput}
                        className="height-50"
                        placeholder="Full Name"
                        required />
                    {(users.searchResults && searchTerm !== "") || users.searchingUsers ?
                        <SearchResults className="full-width min-height-40 white border-gray border-radius-5 absolute above-3 border-box padding-20 overflow-auto-y custom-scrollbar">
                            <div className="display-flex align-items-center">
                                <p className="size-pointeight-rem bold right-margin-10">USER SUGGESTIONS</p>
                                <div className="display-flex align-items justify-center border-radius-30 black size-pointeight-rem white-color left-padding-10 right-padding-10">
                                    {users.searchingUsers || users.searchResults === undefined ?
                                        <span className="size-pointseven-rem white-color">Searching</span>
                                        : users.searchResults.length}
                                </div>
                            </div>
                            {users.searchResults ?
                                users.searchResults?.data.map((user, key) =>
                                    <div key={key} onClick={() => { selectUser(user, true); setSearchTerm(""); }} className={`user display-flex flex-wrap full-width cursor-pointer top-padding-20 ${key !== users.searchResults.length - 1 ? 'border-light-gray-2-dashed' : ''}`}>
                                        <div className="display-flex align-items-center right-margin-50 bottom-padding-10 left-padding-10">
                                            <i className="material-icons right-margin-10 size-pointnine-rem">person</i>
                                            <span className="uppercase size-pointeight-rem">{user.name}</span>
                                        </div>
                                        <div className="display-flex align-items-center right-margin-50 bottom-padding-10 left-padding-10">
                                            <i className="material-icons right-margin-10 size-pointnine-rem">email</i>
                                            <span className="lowercase size-pointeight-rem">{user.email}</span>
                                        </div>
                                    </div>)
                                : ''}
                        </SearchResults>
                        : ''}
                </div>
        </>
    )
}

const SearchResults = styled.div`
    height: 35vh;
`;

export default UserSearch;