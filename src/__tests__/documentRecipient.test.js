import React from 'react';
import { shallow } from 'enzyme';
import DocumentRecipient from "../components/Dashboard/empty-states/EmptyDocumentRecipient"



const shallowSetup = (props = {}) => {

    return shallow(<DocumentRecipient />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

