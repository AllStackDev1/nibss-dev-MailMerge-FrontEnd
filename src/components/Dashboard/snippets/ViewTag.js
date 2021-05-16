import React from "react";
import styled from "styled-components";

const ViewTag = ({
  deleting,
  viewingTags,
  updating,
  setModal,
  setToAddTags,
  closeTags,
  addTagsToRecipient,
  tags,
  recipients,
  toAddTag,
  toAddTags,
  deleteTag,
}) => {
  const renderUpdateText = () => {
    if (updating) {
      return (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }

    return <span>UPDATE TAGS</span>;
  };

  const renderTags = () => {
    if (tags === undefined) {
      return (
        <div className="full-height full-width display-flex align-items-center justify-center right-padding-10 bottom-padding-50 border-box">
          <Loader className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Loader>
        </div>
      );
    }

    return tags?.map((tag, index) => (
      <Tag
        key={index}
        onClick={() => {
          !toAddTag &&
            setToAddTags((setTags) =>
              setTags?.includes(tag.name)
                ? setTags?.filter((item) => item !== tag.name)
                : [...toAddTags, tag.name]
            );
        }}
        className={`${deleting === tag ? "opacity-0-5" : ""} 
                            ${toAddTags?.includes(tag.name) ? "active-tag" : ""} 
                            no-select uppercase`}
        data-test="tag"
      >
        {tag.name}
        {!toAddTag ? (
          <span className="material-icons" onClick={() => deleteTag(tag)}>
            remove_circle
          </span>
        ) : (
          ""
        )}
      </Tag>
    ));
  };

  return (
    <Overlay
      onClick={closeTags}
      className={`${
        viewingTags && "view-tags"
      } full-width full-height absolute left above display-flex flex-end`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="display-flex flex-direction-column"
      >
        <p className="top-padding-50 bottom-padding-20 text-right no-shrink right-padding-30 border-box bold no-select">
          <span
            className="cursor-pointer"
            onClick={() => setModal("create-tag")}
            data-test="view-tag"
          >
            Create New Tag
          </span>
        </p>
        {toAddTag && (
          <p
            className="bottom-padding-20 no-shrink size-pointeight-rem left-padding-30 border-box bold no-select"
            data-test="add-tag"
          >
            ADD TAGS FOR{" "}
            {
              recipients?.data.find((recipient) => recipient._id === toAddTag)
                .name
            }
          </p>
        )}
        <div className="display-flex top-padding-10 flex-wrap full-height overflow-auto-y custom-scrollbar left-padding-30 border-box flex-start-content">
          {renderTags()}
        </div>
        {toAddTag && (
          <div
            className={`full-width 
                        height-70 
                        absolute 
                        display-flex 
                        align-items-center 
                        flex-end 
                        bottom 
                        border-top-lightgray 
                        border-box 
                        no-shrink`}
          >
            <button
              disabled={updating}
              type="submit"
              onClick={addTagsToRecipient}
              className={`border-box 
                                mustard 
                                height-40 
                                no-border 
                                cursor-pointer 
                                white-color 
                                size-pointeight-rem 
                                bold 
                                display-flex 
                                align-items-center 
                                justify-center 
                                right-margin-30`}
            >
              {renderUpdateText()}
            </button>
          </div>
        )}
      </div>
    </Overlay>
  );
};

const Overlay = styled.div`
  background: rgba(24, 37, 56, 0);
  top: 100%;
  transition: background 0.2s;
  & > div:first-of-type {
    width: 40%;
    height: 100%;
    background: #fff;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    transition: transform 200ms linear;
  }
  & > div:first-of-type > p:first-of-type {
    color: #9e7d0a;
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
  background: #e8e8e8;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 7px;
  font-size: 0.7rem;
  color: #182538;
  margin-right: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  & > span {
    font-size: 1.2rem;
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    cursor: pointer;
    color: #e94848;
  }
  &.active-tag {
    background: #919aa3;
    color: #fff;
  }
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  & > div {
    width: 40px;
    height: 40px;
    border-color: #9e7d0a transparent transparent transparent;
  }
`;

export default ViewTag;
