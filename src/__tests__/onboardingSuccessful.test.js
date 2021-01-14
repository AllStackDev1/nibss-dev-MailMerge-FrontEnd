import React from 'react';
import { shallow } from 'enzyme';
import OnboardingSuccessful from "../components/onboarding/steps/onboardingSuccessful"



const shallowSetup = (props = {}) => {

    return shallow(<OnboardingSuccessful {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup({ userLocal: { data: { role: {} } } })
    expect(wrapper).toMatchSnapshot();
})

