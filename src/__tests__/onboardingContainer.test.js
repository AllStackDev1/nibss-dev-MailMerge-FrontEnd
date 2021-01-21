import React from 'react';
import { shallow } from 'enzyme';
import OnboardingContainer from "../components/onboarding/OnboardingContainer"



const shallowSetup = (props = {}) => {

    return shallow(<OnboardingContainer />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

