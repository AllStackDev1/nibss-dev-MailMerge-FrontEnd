import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'actions';
import styled from "styled-components";
import UserSearchResult from './UserSearchResult';

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

    const renderSearchingState = () => {
        if (users.searchingUsers || users.searchResults === undefined) {
            return <span className="size-pointseven-rem white-color">Searching</span>
        }

        return users.searchResults.length;
    }

    return (
        <>

            <div className={`input-container form-input no-padding smaller-placeholder above-all ${searchTerm && searchTerm !== "" && "active"}`}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => {
                        searchUser(e.target.value);
                        setSearchTerm(e.target.value)
                    }}
                    ref={searchInput}
                    className="height-50"
                    placeholder="Full Name"
                    required />
                {((users?.searchResults && searchTerm !== "") || users?.searchingUsers) &&
                    <SearchResults className="full-width min-height-40 white border-gray border-radius-5 absolute above-3 border-box padding-20 overflow-auto-y custom-scrollbar">
                        <div className="display-flex align-items-center">
                            <p className="size-pointeight-rem bold right-margin-10">USER SUGGESTIONS</p>
                            <div className="display-flex align-items justify-center border-radius-30 black size-pointeight-rem white-color left-padding-10 right-padding-10">
                                {renderSearchingState()}
                            </div>
                        </div>
                        {users.searchResults?.data.map((user, key) =>
                            <UserSearchResult
                                key={key}
                                user={user}
                                selectUser={selectUser}
                                setSearchTerm={setSearchTerm}
                                length={users.searchResults.length} />)}
                    </SearchResults>}
            </div>
        </>
    )
}

const SearchResults = styled.div`
    height: 35vh;
`;

export default UserSearch;
