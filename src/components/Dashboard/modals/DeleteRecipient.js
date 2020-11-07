import React from 'react';
import styled from "styled-components";

const DeleteRecipient = ({ onSubmit, deleting, closeModal }) => {
    return (
        <div onClick={e => e.stopPropagation()} className="width-40-percent">
            <div className="display-flex full-width flex-direction-column justify-center bottom-margin-30 text-center">
                <BackButton className="center-item-vertically cursor-pointer display-flex size-pointseven-rem align-items-center white-color left above">
                    <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                    BACK
                </BackButton>
                <p className="white-color bold">Delete Recipient</p>
            </div>
            <div className="action-modal no-select white full-width border-box left-padding-50 right-padding-50 bottom-padding-50 border-radius-10 top-padding-50 text-center">
                <p className="size-onepointfive-rem bold">Confirmation</p>
                <p className="size-one-rem bottom-margin-50">Are you sure you want to delete this recipient?</p>
                <div className="full-width display-flex space-between">
                    <button
                        onClick={onSubmit}
                        type="button"
                        disabled={deleting?._id !== undefined && deleting !== false}
                        className={`width-200 
                        no-border 
                        left-padding-30 
                        right-padding-30 
                        border-box 
                        mustard 
                        height-45 
                        cursor-pointer 
                        white-color 
                        size-pointeight-rem 
                        bold 
                        display-flex 
                        align-items-center 
                        justify-center`}>
                        {deleting?._id !== undefined && deleting !== false ?
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            :
                            'Yes'}
                    </button>
                    <button
                        onClick={closeModal}
                        type="button"
                        disabled={deleting?._id !== undefined && deleting !== false}
                        className={`width-200 
                            no-border 
                            left-padding-30 
                            right-padding-30 
                            border-box 
                            red 
                            height-45 
                            cursor-pointer 
                            white-color 
                            size-pointeight-rem 
                            bold display-flex 
                            align-items-center 
                            justify-center`}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

const BackButton = styled.div`
                                &:hover span {
                                    margin-right: 10px;
                                }
                            `;

export default DeleteRecipient;
