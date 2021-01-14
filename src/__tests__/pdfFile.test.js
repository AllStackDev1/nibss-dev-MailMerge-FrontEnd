import React from 'react';
import { shallow } from 'enzyme';
import PdfFile from "../components/Dashboard/pdfFile"



const shallowSetup = (props = {}) => {

    return shallow(<PdfFile />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

