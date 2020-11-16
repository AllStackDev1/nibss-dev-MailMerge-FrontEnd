import React from 'react'

const RecipientButton = ({ addButtonText, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="uppercase left-padding-20 right-padding-20 height-35 mustard white-color border-radius-2 display-flex justify-center align-items-center">
            {addButtonText}
        </button>
    )
}

export default RecipientButton;