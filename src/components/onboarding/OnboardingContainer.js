import React from 'react'
import OnboardingSteps from './steps/snippets/OnboardingSteps';

const OnboardingContainer = ({ step, setStep, userLocal }) => (
    <div className={`${step === 3 ? 'display-flex align-items-center' : ''} full-width full-height overflow-scroll-y custom-scrollbar`}>
        <div
            className={`
                ${step === 3 ? 'height-60-percent bottom-padding-50' : 'onboarding bottom-padding-150'} 
                smooth 
                overflow-hidden 
                width-70-percent 
                margin-auto 
                top-margin-70 
                bottom-margin-5-percent 
                border-box 
                top-padding-50 
                white 
                border-radius-10 
                box-shadow-less2`}>
            <OnboardingSteps step={step} setStep={setStep} userLocal={userLocal} />
        </div>
    </div>
)

export default OnboardingContainer;
