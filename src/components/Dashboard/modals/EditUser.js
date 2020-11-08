import React from 'react';
import styled from "styled-components";

const EditUser = ({ user, onChange, onSubmit, editing }) => {
    return (
        <div onClick={e => e.stopPropagation()} className="width-40-percent">
            <div className="display-flex full-width flex-direction-column justify-center bottom-margin-30 text-center">
                <BackButton className="center-item-vertically cursor-pointer display-flex size-pointseven-rem align-items-center white-color left above">
                    <span className="material-icons right-margin-5 smooth">keyboard_arrow_left</span>
                    BACK
                </BackButton>
                <p className="white-color bold">Edit User</p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="action-modal no-select white full-width border-box left-padding-50 right-padding-50 bottom-padding-50 border-radius-10 top-padding-50">
                    <p className="size-pointeight-rem bottom-margin-10 gray-color bold">Full Name</p>
                    <input type="text" name="name" onChange={onChange} value={user.name || ""} placeholder="Full Name" className="bottom-margin-20" required />
                    <p className="size-pointeight-rem bottom-margin-10 gray-color bold">Email address</p>
                    <input type="email" name="email" onChange={onChange} value={user.email || ""} placeholder="Email address" className="bottom-margin-20" required />
                    <button type="submit" disabled={editing} className="width-200 no-border left-padding-30 right-padding-30 border-box mustard height-45 cursor-pointer white-color size-pointeight-rem bold display-flex align-items-center justify-center">
                        {editing ?
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            :
                            'UPDATE'}
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

export default EditUser;
