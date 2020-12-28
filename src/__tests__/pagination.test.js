import React from 'react';
import { shallow } from 'enzyme';
import Pagination from "../components/Dashboard/empty-states/Pagination"



const shallowSetup = (props = {}) => {

    return shallow(<Pagination />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})