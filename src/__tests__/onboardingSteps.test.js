import React from 'react';
import { shallow } from 'enzyme';
import OnboardingSteps from "../components/onboarding/steps/snippets/OnboardingSteps"



const shallowSetup = (props = {}) => {

    return shallow(<OnboardingSteps />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

