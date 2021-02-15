import React from 'react';
import { shallow } from 'enzyme';
import App from "../App"



const shallowSetup = (props = {}) => {

    return shallow(<App />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy()
})

