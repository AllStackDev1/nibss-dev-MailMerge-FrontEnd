import React from "react"
import styled from "styled-components"

const ViewTag = ({ viewingTags, setModal, closeTags, fetching, tags }) => {
    return (
        <Overlay onClick={closeTags} className={`${viewingTags ? 'view-tags' : ''} full-width full-height absolute left above display-flex flex-end`}>
            <div onClick={e => e.stopPropagation()} className="display-flex flex-direction-column">
                <p className="top-padding-50 bottom-padding-30 text-right no-shrink right-padding-30 border-box bold no-select">
                    <span className="cursor-pointer" onClick={() => setModal("create-tag")}>Create New Tag</span>
                </p>
                <div className="display-flex top-padding-10 flex-wrap full-height overflow-auto-y custom-scrollbar left-padding-30 border-box flex-start-content">
                    {tags === undefined ?
                        <div className="full-height full-width display-flex align-items-center justify-center right-padding-10 bottom-padding-50 border-box">
                            <Loader className="lds-ring"><div></div><div></div><div></div><div></div></Loader>
                        </div>
                        :
                        tags ?
                            tags.map((tag, index) =>
                                <Tag key={index} className="no-select uppercase">
                                    {tag.name}
                                    <span className="material-icons">remove_circle</span>
                                </Tag>
                            )
                            :
                            ""
                    }
                </div>
            </div>
        </Overlay>
    )
};

const Overlay = styled.div`background: rgba(24, 37, 56, 0);
                            top: 100%;
                            transition: background 0.2s;
                            & > div:first-of-type {
                                width: 40%;
                                height: 100%;
                                background: #FFF;
                                -webkit-transform: translateX(100%);
                                transform: translateX(100%);
                                transition: transform 200ms linear;
                            }
                            & > div:first-of-type > p {
                                color: #9E7D0A;
                                font-size: 0.9rem;
                            }
                            &.view-tags {
                                top: 0;
                                background: rgba(24, 37, 56, 0.6);
                            }
                            &.view-tags > div {
                                -webkit-transform: none;
			                    transform: none;
                            }
                            `;

const Tag = styled.p`
                    background: #E8E8E8;
                    padding: 5px;
                    padding-left: 15px;
                    padding-right: 15px;
                    border-radius: 7px;
                    font-size: 0.7rem;
                    color: #182538;
                    margin-right: 30px;
                    margin-bottom: 30px;
                    & > span {
                        font-size: 1.2rem;
                        position: absolute;
                        top: -0.5rem;
                        right: -0.5rem;
                        cursor: pointer;
                        color: #E94848;
                    }
                `;

const Loader = styled.div`
                    width: 40px;
                    height: 40px;
                    & > div {
                        width: 40px;
                        height: 40px;
                        border-color: #9E7D0A transparent transparent transparent
                    }
                `;

export default ViewTag;