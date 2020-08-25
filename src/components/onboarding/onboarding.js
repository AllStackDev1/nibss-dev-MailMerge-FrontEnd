import React, { useState } from 'react'
import InviteUsers from './steps/inviteUsers';
import SaveSignature from './steps/saveSignature';
import OnboardingSuccessful from './steps/onboardingSuccessful';

const Onboarding = props => {
    const [step, setStep] = useState(1);

    return (
        <div className="full-height-vh full-width display-flex light-brown">
            <div className="width-20-percent full-height white box-shadow-less2 padding-20 border-box">
                <img src={require(`images/logo.svg`)} className="height-80 bottom-margin-40" alt="NIBSS logo" />
                <div className="left-padding-20 right-padding-20">
                    <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 full-width border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 full-width border-radius-10 bottom-margin-50 light-gray"></div>
                    <div className="height-12 width-50-percent border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 width-70-percent border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 width-70-percent border-radius-10 bottom-margin-30 light-gray"></div>
                    <div className="height-12 full-width border-radius-10 light-gray"></div>
                </div>
            </div>
            <div className={`${step === 3 ? 'display-flex align-items-center' : ''} full-width full-height overflow-scroll-y custom-scrollbar`}>
                <div className={`${step === 3 ? 'height-60-percent bottom-padding-50' : 'onboarding bottom-padding-150'} smooth overflow-hidden width-70-percent margin-auto top-margin-70 bottom-margin-5-percent border-box top-padding-50 white border-radius-10 box-shadow-less2`}>
                    {step === 1 ?
                        <InviteUsers />
                        : ""}
                    {step === 2 ?
                        <SaveSignature />
                        : ""}
                    {step === 3 ?

                        <OnboardingSuccessful />
                        : ""}
                    {step <= 2 ?
                        <div className="height-80 white full-width absolute bottom border-top-lightgray left-padding-80 right-padding-80 border-box display-flex align-items-center space-between">
                            <p className="size-pointnine-rem mustard-color no-select cursor-pointer bold">SKIP</p>
                            <button onClick={() => setStep(step => step + 1)} className="left-padding-30 right-padding-30 height-45 mustard white-color border-radius-2 display-flex justify-center align-items-center">
                                {step === 2 ? 'SAVE' : 'NEXT'}
                            </button>
                        </div>
                        : ""}
                </div>
            </div>
        </div>
    );
}

export default Onboarding