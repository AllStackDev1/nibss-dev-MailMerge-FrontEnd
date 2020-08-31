import React from "react"
import styled from "styled-components"

const ViewTag = ({ viewingTags }) => {
    return (
        <Overlay className={`${viewingTags ? 'view-tags' : ''} full-width full-height absolute left above-all display-flex flex-end`}>
            <div className="display-flex flex-direction-column smooth">
                <p className="top-padding-50 bottom-padding-30 text-right no-shrink right-padding-30 border-box bold no-select cursor-pointer">Create New Tag</p>
                <div className="display-flex top-padding-10 flex-wrap full-height overflow-auto-y custom-scrollbar left-padding-30 border-box flex-start-content">
                    {[...Array(28)].map((item, index) =>
                        <>
                            <Tag className="no-select">
                                Marketers
                                <span class="material-icons">remove_circle</span>
                            </Tag>
                            <Tag className="no-select">
                                CEO
                                <span class="material-icons">remove_circle</span>
                            </Tag>
                            <Tag className="no-select">
                                Startups
                                <span class="material-icons">remove_circle</span>
                            </Tag>
                            <Tag className="no-select">
                                CEO
                                <span class="material-icons">remove_circle</span>
                            </Tag>
                        </>
                    )}
                </div>
            </div>
        </Overlay>
    )
};

const Overlay = styled.div`background: rgba(24, 37, 56, 0);
                            top: 100%;
                            transition: opacity 1s;
                            & > div:first-of-type {
                                width: 40%;
                                height: 100%;
                                background: #FFF;
                                margin-right: -40%;
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
                                margin-right: 0;
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

export default ViewTag;