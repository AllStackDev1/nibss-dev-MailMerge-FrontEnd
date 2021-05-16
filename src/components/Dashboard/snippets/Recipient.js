import React from "react";
import styled from "styled-components";
import { getColor } from "helpers/getColor";
import { getInitials } from "helpers/getInitials";

const Recipient = ({
  setModal,
  setEditRecipient,
  deleteRecipient,
  recipientBeingDeleted,
  recipient,
  initiateEdit,
  toAddTag,
  localUserRole,
}) => {
  const renderTags = () => {
    if (recipient?.tag?.length === 0) {
      return <i data-testid="no-tag">No tag</i>;
    }

    return recipient.tag.map((tag, index) => (
      <Tag key={index} className="uppercase">
        {tag}
      </Tag>
    ));
  };

  const renderRecToAddTag = () => {
    return (
        recipient._id !== toAddTag && (
        <div className="box-shadow-less2 border-radius-10 padding-10 white">
          <div
            onClick={() => {
              setModal("edit-recipient");
              setEditRecipient(recipient);
            }}
            data-testid="edit-recipient"
            className="smooth display-flex align-items-center"
          >
            <div
              className="width-30 height-35"
            ></div>
            Edit Recipient
          </div>
          <div
            onClick={() => initiateEdit(recipient._id)}
            className="smooth display-flex align-items-center"
            data-testid="initiate-edit"
          >
            <div className="width-30 height-35"></div>
            Add Tags
          </div>
          <Delete
            onClick={() => deleteRecipient(recipient)}
            className="smooth display-flex align-items-center"
            data-testid="delete-recipient"
          >
            <div className="width-30 height-35 display-flex align-items-center justify-center">
              <img
                src={require(`images/icons/dashboard/delete-recipient.svg`)}
                className="height-15"
                alt="Delete recipient"
              />
            </div>
            Delete Recipient
          </Delete>
        </div>
      )
    );
  };


  return (
    <RecipientInstance
      className={`${
        recipientBeingDeleted?._id === recipient._id ? "opacity-0-5" : ""
      }
                smooth min-height-80 full-width border-radius-10 white display-flex align-items-center space-between`}
    >
      <Profile
        style={{ backgroundColor: getColor(recipient.name) }}
        className={`white-color 
                display-flex 
                align-items-center 
                justify-center 
                size-pointeight-rem 
                bold 
                no-shrink 
                width-40 
                height-40 
                right-margin-20 
                border-radius-100-percent 
                left-margin-10`}
      >
        {getInitials(recipient.name)}
      </Profile>
      <div className="no-shrink width-25-percent size-pointeight-rem bold capitalize">
        {recipient.name}
      </div>
      <div className="no-shrink width-20-percent size-pointeight-rem">
        <p className="size-pointeight-rem light-gray-color">
          {recipient.email}
        </p>
      </div>
      <div
        className={`no-shrink width-20-percent right-padding-20 left-padding-20 size-pointeight-rem display-flex flex-wrap`}
      >
        {renderTags()}
      </div>
      <Status
        className={`${recipient.status} active no-shrink height-25 width-100 right-margin-50 border-box border-radius-20 capitalize`}
      >
        <p className="bold">{recipient.status}</p>
      </Status>
      {localUserRole?.data?.role === "administrator" ? (
        <Menu className="no-shrink width-50 height-50 size-pointeight-rem right-margin-20 display-flex align-items-center justify-center">
          <img
            src={require(`images/icons/dashboard/more.svg`)}
            className="height-5"
            alt="NIBSS PDF"
          />
          {renderRecToAddTag()}
        </Menu>
      ) : (
        <div className="no-shrink width-50 height-50 size-pointeight-rem right-margin-20 display-flex align-items-center justify-center"></div>
      )}
    </RecipientInstance>
  );
};

const Menu = styled.div`
  & > div {
    background: #fff !important;
    display: none;
    position: absolute;
    right: -10px;
    top: 40px;
    z-index: 1;
  }
  & > div {
    white-space: nowrap;
    padding-right: 25px !important;
  }
  &:hover > div {
    display: block;
  }
  & > div > div:hover {
    opacity: 0.5;
  }
`;

const Delete = styled.div`
  color: #e94848;
  & > div > img {
    margin-bottom: 2px;
  }
`;

const RecipientInstance = styled.div`
  cursor: pointer;
  &:hover {
    background: #f2f6f9 !important;
  }
`;

const Tag = styled.p`
  background: #e8e8e8;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  font-size: 0.7rem;
  color: #182538;
  margin-bottom: 5px;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const Status = styled.div`
  background: #c5fcdf;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    border-radius: 100%;
    width: 8px;
    height: 8px;
    margin-right: 10px;
  }
  &.active {
    background: #85d9bf;
  }
  &.inactive {
    background: #919aa3;
  }
  & > p {
    color: #fff;
    font-size: 0.8rem;
  }
`;

const Profile = styled.div`
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
`;

export default Recipient;
