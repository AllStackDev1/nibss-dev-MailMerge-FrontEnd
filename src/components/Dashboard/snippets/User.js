import React from 'react'
import styled from 'styled-components'
import { getColor } from 'helpers/getColor';
import { getInitials } from 'helpers/getInitials';

const User = ({ user, setUser, updateRole, userBeingUpdated, deleteUser, setModal }) => {
    return (
        <UserInstance className={`${userBeingUpdated?._id === user._id ? "opacity-0-5" : ""} smooth height-80 full-width border-radius-10 white display-flex align-items-center space-between`}>
            <Profile style={{ backgroundColor: getColor(user.name) }} className="white-color display-flex align-items-center justify-center size-pointeight-rem bold no-shrink width-40 height-40 right-margin-20 border-radius-100-percent left-margin-10">
                {getInitials(user.name)}
            </Profile>
            <div className="no-shrink width-25-percent size-pointeight-rem bold capitalize">
                {user.name}
            </div>
            <div className="no-shrink width-20-percent size-pointeight-rem">
                <p className="size-pointeight-rem light-gray-color truncate">{user.email}</p>
            </div>
            <div className="no-shrink width-20-percent size-pointeight-rem capitalize">
                <p className="size-pointeight-rem light-gray-color">{user.role}</p>
            </div>
            <Status className={`${user.status} no-shrink height-25 width-100 right-margin-50 border-box border-radius-20 capitalize`}>
                <p className="bold">{user.status}</p>
            </Status>
            <Menu className="no-shrink width-50 height-50 size-pointeight-rem right-margin-20 display-flex align-items-center justify-center">
                <img src={require(`images/icons/dashboard/more.svg`)} className="height-5" alt="NIBSS PDF" />
                <div className="box-shadow-less2 border-radius-10 padding-10 white">
                    <div onClick={() => {
                        setModal("edit-user");
                        setUser(user);
                    }} className="smooth display-flex align-items-center">
                        <div className="width-30 height-35"></div>
                        Edit User
                    </div>
                    <div className="smooth display-flex align-items-center" onClick={() => updateRole(user)}>
                        <div className="width-30 height-35"></div>
                        Assign as {user.role === "administrator" ? "user" : "admin"}
                    </div>
                    <Delete onClick={() => {
                        deleteUser(user);
                        setModal('delete-user')
                    }} className="smooth display-flex align-items-center">
                        <div className="width-30 height-35 display-flex align-items-center justify-center">
                            <img src={require(`images/icons/dashboard/delete-recipient.svg`)} className="height-15" alt="Delete recipient" />
                        </div>
                        Delete User
                    </Delete>
                </div>
            </Menu>
        </UserInstance>
    )
}


const Menu = styled.div`&>div{
    background: #FFF !important;
    display: none;
    position: absolute;
    right: -10px;
    top: 40px;
    z-index: 1;
}
&>div{
    white-space: nowrap;
    padding-right: 25px !important;
}
&:hover>div{
    display: block;
}
&>div>div:hover{
    opacity: 0.5
}
`;

const Delete = styled.div`
                            color: #E94848;
                            &>div>img {
                                margin-bottom: 2px;
                            }
                        `;

const UserInstance = styled.div`
                                cursor: pointer;
                                &:hover{
                                    background: #F2F6F9 !important;
                                }
                                `;

const Status = styled.div`background: #C5FCDF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &>div {
                            border-radius: 100%;
                            width: 8px;
                            height: 8px;
                            margin-right: 10px;
                        }
                        &.active {
                            background: #85D9BF;
                        }
                        &.inactive {
                            background: #919AA3;
                        }
                        &>p {
                            color: #FFF;
                            font-size: 0.8rem;
                        }
                        `;

const Profile = styled.div`background-image: url(${props => props.url});
                        background-position: center;
                        background-size: cover;`;

export default User;
