import React from 'react'
import { Link } from 'react-router-dom';

const Login = props => (
    <div className="auth full-height-vh full-width">
        <div className="width-30-percent full-height display-flex flex-start flex-direction-column justify-center left-padding-80 no-select">
            <img src={require(`images/logo.svg`)} className="height-80 bottom-margin-20" alt="NIBSS logo" />
            <p className="size-onepointfive-rem bold bottom-margin-20">Login into your account</p>
            <p className="size-pointnine-rem gray-color bottom-margin-40">
                Start your free trial to start sending legally binding eSignatures.
            </p>
            <Link to="/onboarding" className="width-85-percent">
            <div className="left-padding-30 right-padding-30 border-box mustard height-55 cursor-pointer white-color size-pointnine-rem bold display-flex align-items-center space-between">
                <p>LOGIN WITH NIBBS</p>
                <span class="material-icons">
                    arrow_forward
                </span>
            </div>
            </Link>
            <div className="display-flex size-pointeight-rem top-margin-30">
                <p>Dont have an acccount ?</p>
                <Link to="/signup">
                    <p className="bold mustard-color left-padding-40 cursor-pointer">Create account</p>
                </Link>
            </div>
        </div>
    </div>
);

export default Login