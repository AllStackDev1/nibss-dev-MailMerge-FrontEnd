import React from 'react'
import InviteUsers from '../inviteUsers'
import OnboardingSuccessful from '../onboardingSuccessful'
import SaveSignature from '../saveSignature'

const OnboardingSteps = ({ step, setStep, userLocal }) => (
    <>
        {step === 1 &&
            <SaveSignature
                step={step}
                setStep={setStep} />}
        {step === 2 &&
            <InviteUsers
                step={step}
                setStep={setStep} />}
        {step === 3 &&
            <OnboardingSuccessful
                userLocal={userLocal} />}
    </>
)

export default OnboardingSteps;
