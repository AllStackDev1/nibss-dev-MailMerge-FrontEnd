import React from 'react'

const SignatureOption = ({ onClick, signatureType, optionType, image, label, icon }) =>
    <div
        onClick={onClick}
        className={`${signatureType === optionType ? 'border-gray' : 'opacity-0-5'} 
        smooth 
        border-box 
        no-select 
        cursor-pointer 
        height-80 
        border-radius-7 
        gray 
        right-margin-30 
        display-flex 
        flex-direction-column 
        align-items-center 
        justify-center 
        left-padding-20
        right-padding-20`}>
        {image ?
            <img src={image} className="height-25" alt="Invite users" />
            :
            <i className="material-icons">{icon}</i>}
        <p className="bold size-pointeight-rem top-margin-10 no-wrap">{label}</p>
    </div>

export default SignatureOption;