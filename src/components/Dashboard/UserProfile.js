import React, { useState, useEffect } from "react"
import PageTitle from "./snippets/PageTitle"
import styled from "styled-components"
import Signature from "./snippets/Signature";
import { authActions } from "actions";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
    const [tab, setTab] = useState(1);
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(authActions.fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        let userLocal = JSON.parse(localStorage.getItem(`nibss-user`));

        if (userLocal !== undefined) {
            setUser(userLocal.data);
        }
    }, []);

    const onChange = event => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    const updateProfile = e => {
        e.preventDefault();

        dispatch(authActions.updateProfile(user));
    }

    return (
        <div className="full-width border-box left-padding-30 right-padding-30">
            <PageTitle
                title="User Profile"
            />
            <div className="full-width min-height-600 white border-radius-10 padding-30 border-box top-margin-30">
                <Tabs className="height-50 no-select full-width display-flex">
                    <Tab onClick={() => setTab(1)} className={`${tab === 1 ? "active-tab" : ""} left-padding-50 right-padding-50 display-flex align-items-center size-pointnine-rem cursor-pointer`}>
                        My Profile
                        <div></div>
                    </Tab>
                    <Tab onClick={() => setTab(2)} className={`${tab === 2 ? "active-tab" : ""} left-padding-50 right-padding-50 display-flex align-items-center size-pointnine-rem cursor-pointer`}>
                        Saved signature
                        <div></div>
                    </Tab>
                </Tabs>
                {tab === 1 ?
                    <form onSubmit={updateProfile}>
                        <div className="width-50-percent top-margin-20">
                            <input type="text" name="name" value={user.name || ""} onChange={onChange} placeholder="First Name" className="bottom-margin-20" required />
                            <input type="text" name="mobile" value={user.mobile || ""} onChange={onChange} placeholder="Phone" className="bottom-margin-20" required />
                            <input type="email" name="email" value={user.email || ""} onChange={onChange} placeholder="Email address" className="bottom-margin-20" required />
                            <button type="submit" disabled={auth.updatingProfile} className="uppercase left-padding-20 right-padding-20 height-40 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                                {auth.updatingProfile ?
                                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                    :
                                    <p>UPDATE PROFILE</p>}
                            </button>
                        </div>
                    </form>
                    : ""}
                {tab === 2 ?
                    <div className="full-width display-flex space-between flex-wrap top-padding-30">
                        {user.signatures ?
                            user.signatures.length > 0 ?
                                user.signatures.map((signature, index) =>
                                    <Signature
                                        signature={signature}
                                        key={index} />
                                )
                                : ""
                            : ""}
                    </div>
                    : ""}
            </div>
        </div>
    )
};

const Tabs = styled.div`
                        border-bottom: 1px solid #E7E7E7;
                    `;

const Tab = styled.div`
                        &>div {
                            width: 100%;
                            height: 0;
                            background: #9E7D0A;
                            position: absolute;
                            bottom: -1px;
                            left: 0;
                        }
                        &.active-tab {
                            color: #9E7D0A;
                        }
                        &.active-tab>div {
                            height: 3px;
                        }
                    `;

export default UserProfile;