import React, { useState } from 'react'
import styled from "styled-components";
import { authActions } from 'actions';
import { useDispatch, useSelector } from 'react-redux';

const Login = props => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const login = e => {
        e.preventDefault();

        dispatch(authActions.login(user));
    }

    const onChange = event => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    return (
        <div className="auth full-height-vh full-width">
            <div className="width-30-percent full-height display-flex flex-start flex-direction-column justify-center left-padding-80 no-select">
                <img src={require(`images/logo.svg`)} className="height-80 bottom-margin-20" alt="NIBSS logo" />
                <p className="size-onepointfive-rem bold bottom-margin-20">Login into your account</p>
                <form onSubmit={login} className="width-85-percent">
                    <div className="full-width bottom-margin-15">
                        <InputGroup className="input-group full-width height-55 bottom-margin-15 border-radius-10">
                            <input type="email" name="email_input" onChange={onChange} value={user.email_input || ""} className={`${user.email_input !== undefined && user.email_input !== "" ? "with-data" : ""} height-55 smooth`} required autoComplete="new-password" />
                            <label className="smooth">Enter your email address</label>
                        </InputGroup>
                        <InputGroup className="input-group full-width height-55 bottom-margin-15 border-radius-10">
                            <input type="text" name="username" onChange={onChange} value={user.username || ""} className={`${user.username !== undefined && user.username !== "" ? "with-data" : ""} height-55 smooth`} required autoComplete="new-password" />
                            <label className="smooth">Username</label>
                        </InputGroup>
                        <InputGroup className="input-group full-width height-55 border-radius-10">
                            <input type="password" name="password" onChange={onChange} value={user.password || ""} className={`${user.password !== undefined && user.password !== "" ? "with-data" : ""} height-55 smooth`} required autoComplete="new-password" />
                            <label className="smooth">Enter password</label>
                        </InputGroup>
                    </div>
                    <button type="submit" disabled={auth.loggingIn} className="full-width bottom-margin-30 left-padding-30 right-padding-30 border-box border-radius-10 mustard height-55 cursor-pointer white-color size-pointnine-rem bold display-flex align-items-center justify-center">
                        {auth.loggingIn ?
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            :
                            <p>Access account</p>}
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputGroup = styled.div`
                                background: #FFF;
                                & input {
                                    padding-left: 20px;
                                    padding-right: 20px;
                                    border: none !important;
                                    border-radius: 10px;
                                    background: none !important;
                                    border: 1px solid rgb(247 243 232) !important;
                                    background: rgba(158, 125, 10, 0.05) !important;
                                }
                                & label {
                                    position: absolute;
                                    left: 20px;
                                    top: 50%;
                                    transform: translate(0, -50%);
                                    -webkit-transform: translate(0, -50%);
                                    -moz-transform: translate(0, -50%);
                                    font-size: 0.85rem;
                                    color: rgba(24, 37, 56, 0.3);
                                    padding: 2px 10px;
                                }
                            `;

export default Login