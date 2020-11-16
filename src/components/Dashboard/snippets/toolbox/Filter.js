import React from 'react'

const Filter = ({index, onClick, name, checked}) => {
    return (
        <div
            key={index}
            onClick={onClick}
            className="smooth capitalize display-flex align-items-center bottom-margin-10">
            <div className="width-30 right-margin-10">
                <input readOnly type="checkbox" id={`tag-${index}`} checked={checked} className="checkbox-s" />
                <label htmlFor={`tag-${index}`} className="no-shrink"></label>
            </div>
            {name}
        </div>
    )
}

export default Filter;