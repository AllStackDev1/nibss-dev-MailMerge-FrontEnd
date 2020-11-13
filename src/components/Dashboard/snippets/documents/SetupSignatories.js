import React, { useState } from "react"
import UserSearch from "./UserSearch"
import styled from "styled-components"

const SetupSignatories = ({ selectUser, document }) => {
    const [signatory, setSignatory] = useState({});

    const addSignatory = e => {
        e.preventDefault();

        selectUser(signatory);
        setSignatory({});
    }

    const onChange = event => {
        const { name, value } = event.target;

        setSignatory({
            ...signatory,
            [name]: value
        });
    }

    return (
        <>
            <p className="gray-color size-onepointtwo-rem bold text-center top-margin-30">Setup Signatories</p>
            <p className="light-gray-color size-pointeight-rem text-center top-margin-5">Tell us who is signing this document</p>
            <div className="width-100 height-1 border-bottom-gray top-margin-20"></div>
            <div className="display-flex full-height overflow-hidden width-85-percent top-margin-40 border-box">
                <div className="width-50-percent border-box left-padding-10 overflow-auto-y custom-scrollbar border-right-gray-1 right-padding-60">
                    <p className="size-pointnine-rem bold bottom-margin-15">NIBSS members</p>
                    <form>
                        <UserSearch
                            selectUser={selectUser} />
                        <DocumentButton type="submit" className="width-90 height-35 top-margin-15 box-shadow-less2 border-radius-5 display-flex align-items-center justify-center">
                            <span className="mustard-color bold size-pointeightfive-rem">ADD</span>
                        </DocumentButton>
                    </form>
                    {document.signatories ?
                        document.signatories.filter(signatory => signatory.nibss === true).map((signatory, key) =>
                            <div
                                key={key}
                                className={`user display-flex flex-wrap full-width cursor-pointer top-padding-20 
                                    ${key !== document.signatories.filter(signatory => signatory.nibss === true).length - 1 ? 'border-light-gray-2-dashed' : ''}`}>
                                <div className="display-flex align-items-center right-margin-50 bottom-padding-10 left-padding-10">
                                    <i className="material-icons right-margin-10 size-pointnine-rem">person</i>
                                    <span className="uppercase size-pointeight-rem">{signatory.name}</span>
                                </div>
                                <div className="display-flex align-items-center right-margin-50 bottom-padding-10 left-padding-10">
                                    <i className="material-icons right-margin-10 size-pointnine-rem">email</i>
                                    <span className="lowercase size-pointeight-rem">{signatory.email}</span>
                                </div>
                            </div>)
                        : ''}
                </div>
                <div className="width-50-percent right-padding-10 overflow-auto-y custom-scrollbar left-padding-60 border-box">
                    <p className="size-pointnine-rem bold bottom-margin-15">External members</p>
                    <form onSubmit={addSignatory}>
                        <input type="text" name="name" onChange={onChange} value={signatory.name || ""} placeholder="Full Name" className="height-50 bottom-margin-10" required />
                        <input type="email" name="email" onChange={onChange} value={signatory.email || ""} placeholder="Email address" className="height-50" required />
                        <DocumentButton type="submit" className="width-90 height-35 top-margin-15 box-shadow-less2 border-radius-5 display-flex align-items-center justify-center">
                            <span className="mustard-color bold size-pointeightfive-rem">ADD</span>
                        </DocumentButton>
                    </form>
                    {document.signatories ?
                        document.signatories.filter(signatory => signatory.nibss !== true).map((signatory, key) =>
                            <div
                                key={key}
                                className={`user display-flex flex-wrap full-width cursor-pointer top-padding-20 
                                    ${key !== document.signatories.filter(signatory => signatory.nibss !== true).length - 1 ? 'border-light-gray-2-dashed' : ''}`}>
                                <div className="display-flex align-items-center right-margin-50 bottom-padding-10 left-padding-10">
                                    <i className="material-icons right-margin-10 size-pointnine-rem">person</i>
                                    <span className="uppercase size-pointeight-rem">{signatory.name}</span>
                                </div>
                                <div className="display-flex align-items-center right-margin-50 bottom-padding-10 left-padding-10">
                                    <i className="material-icons right-margin-10 size-pointnine-rem">email</i>
                                    <span className="lowercase size-pointeight-rem">{signatory.email}</span>
                                </div>
                            </div>)
                        : ''}
                </div>
            </div>
        </>
    )
}

const DocumentButton = styled.button`
                        min-width: 50px;
                    `;

export default SetupSignatories;
