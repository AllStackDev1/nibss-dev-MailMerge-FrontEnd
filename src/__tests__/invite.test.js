import React from 'react';
import { shallow } from 'enzyme';
import Invite from "../components/onboarding/steps/snippets/Invite"



const shallowSetup = (props = {}) => {

    return shallow(<Invite />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

