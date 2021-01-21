import React from 'react';
import { shallow } from 'enzyme';
import Recipient from "../components/Dashboard/empty-states/Recipient"



const shallowSetup = (props = {}) => {

    return shallow(<Recipient {...props} />)
}

it('should match snapshot', () => {

    const recipient = { _id: "123" }
    const wrapper = shallowSetup({ recipient })
    expect(wrapper).toMatchSnapshot();
})



