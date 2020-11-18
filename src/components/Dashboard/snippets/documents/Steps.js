import React from 'react'
import { Step, StepDelimiter } from 'styles/styled-components/DocumentSteps';

const Steps = ({ step }) => {
    const documentStepClasses = `smooth 
        height-35 
        width-35 
        display-flex 
        align-items-center 
        justify-center 
        border-radius-100-percent`;

    const activeStepClass = 'active-step';

    return (
        <>
            <Step className={`${step === 1 && activeStepClass} ${documentStepClasses}`}>
                1
            </Step>
            <StepDelimiter></StepDelimiter>
            <Step className={`${step === 2 && activeStepClass} ${documentStepClasses}`}>
                2
            </Step>
            <StepDelimiter></StepDelimiter>
            <Step className={`${step === 3 && activeStepClass} ${documentStepClasses}`}>
                3
            </Step>
            <StepDelimiter></StepDelimiter>
            <Step className={`${step === 4 && activeStepClass} ${documentStepClasses}`}>
                4
            </Step>
        </>)
}

export default Steps;
