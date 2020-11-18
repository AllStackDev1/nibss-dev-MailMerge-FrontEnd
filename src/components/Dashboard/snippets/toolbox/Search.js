import React from 'react'

const Search = ({ search, onChange }) => (
    <>
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
    </>
)

export default Search;
