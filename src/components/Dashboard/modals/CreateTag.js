import React from 'react';
import styled from "styled-components";

const CreateTag = ({ tag, onChange, onSubmit, creating }) => {
    return (
        <div onClick={e => e.stopPropagation()} className="width-40-percent">
            <div className="display-flex full-width flex-direction-column justify-center bottom-margin-30 text-center">
                <BackButton className="center-item-vertically cursor-pointer display-flex size-pointseven-rem align-items-center white-color left above">
                    <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                    BACK
                </BackButton>
                <p className="white-color bold">Create Tags</p>
                <p className="white-color size-pointeight-rem">Create and save user Tags</p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="action-modal no-select white full-width border-box left-padding-50 right-padding-50 bottom-padding-50 border-radius-10 top-padding-50">
                    <p className="size-pointeight-rem bottom-margin-10 gray-color bold">Create Tag</p>
                    <input type="text" name="name" value={tag.name || ""} onChange={onChange} placeholder="Enter Tag Name" className="bottom-margin-20" required />
                    <button type="submit" disabled={creating} className="width-200 no-border left-padding-30 right-padding-30 border-box mustard height-45 cursor-pointer white-color size-pointeight-rem bold display-flex align-items-center justify-center">
                        {creating ?
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            :
                            'CREATE'}
                    </button>
                </div>
            </form>
        </div>
    );
}

const BackButton = styled.div`
                                &:hover span {
                                    margin-right: 10px;
                                }
                            `;

export default CreateTag;
