import React from 'react'
import { Link } from 'react-router-dom';

const OnboardingSuccessful = ({ userLocal }) => {
    return (
        <div className="full-height left-padding-80 right-padding-80 display-flex flex-direction-column justify-center align-items-center">
            <img src={require(`images/icons/onboarding-successful.svg`)} className="height-80 bottom-margin-30" alt="Invite users" />
            <p className="size-onepointfive-rem bold bottom-padding-10 text-center">Onboarding Sucessful</p>
            <p className="size-pointeight-rem light-gray-color text-center bottom-margin-30">You have sucessfully onboarding on NIBS Mail merge</p>
            <Link to={`/dashboard${userLocal.data.role === "user" ? '/documents' : ''}`}>
                <button type="button" className="left-padding-30 right-padding-30 height-50 width-300 mustard border-radius-2 display-flex align-items-center justify-center">
                    <span className="white-color bold size-pointeightfive-rem left-padding-10">CONTINUE TO DASHBOARD</span>
                </button>
            </Link>
        </div>
    )
}

export default OnboardingSuccessful;