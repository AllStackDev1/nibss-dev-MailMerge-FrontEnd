import React from 'react'
import { Link } from 'react-router-dom';

const Signup = props => (
    <div className="auth full-height-vh full-width">
        <div className="width-30-percent full-height display-flex flex-start flex-direction-column justify-center left-padding-80 no-select">
            <img src={require(`images/logo.svg`)} className="height-80 bottom-margin-20" alt="NIBSS logo" />
            <p className="size-onepointfive-rem bold bottom-margin-20">Create an account</p>
            <p className="size-pointnine-rem gray-color bottom-margin-40">
                Start your free trial to start sending legally binding eSignatures.
            </p>
            <div
                className={`
                    left-padding-30 
                    right-padding-30 
                    border-box 
                    mustard 
                    height-55 
                    cursor-pointer 
                    width-85-percent 
                    white-color 
                    size-pointnine-rem 
                    bold 
                    display-flex 
                    align-items-center 
                    space-between`}>
                <p>SIGN UP WITH NIBBS</p>
                <span className="material-icons">
                    arrow_forward
                </span>
            </div>
            <div className="display-flex size-pointeight-rem top-margin-30">
                <p>Already have an account</p>
                <Link to="/">
                    <p className="bold mustard-color left-padding-40 cursor-pointer">Login</p>
                </Link>
            </div>
        </div>
    </div>
);

export default Signup;
