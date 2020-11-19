import React from 'react'

const UserSearchResult = ({key, user, selectUser, setSearchTerm, length}) => (
    <div
        key={key}
        onClick={() => {
            selectUser(user, true);
            setSearchTerm("");
        }}
        className={`user display-flex flex-wrap full-width cursor-pointer top-padding-20 
                    ${key !== length - 1 ? 'border-light-gray-2-dashed' : ''}`}>
        <div className="display-flex align-items-center right-margin-50 bottom-padding-10 left-padding-10">
            <i className="material-icons right-margin-10 size-pointnine-rem">person</i>
            <span className="uppercase size-pointeight-rem">{user.name}</span>
        </div>
        <div className="display-flex align-items-center right-margin-50 bottom-padding-10 left-padding-10">
            <i className="material-icons right-margin-10 size-pointnine-rem">email</i>
            <span className="lowercase size-pointeight-rem">{user.email}</span>
        </div>
    </div>
)

export default UserSearchResult;
