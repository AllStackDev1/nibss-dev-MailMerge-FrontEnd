import React from 'react';
import { shallow } from 'enzyme';
import ImageFile from "../components/Dashboard/imageFile"



const shallowSetup = (props = {}) => {

    return shallow(<ImageFile />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

