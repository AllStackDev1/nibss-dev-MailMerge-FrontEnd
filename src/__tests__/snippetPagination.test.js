import React from 'react';
import { mount } from 'enzyme';
import Pagination from "../components/Dashboard/snippets/Pagination"


const shallowSetup = (props = {}) => {

    return mount(
        <Pagination {...props} />
    )
}

it("should render properly", () => {

    const wrapper = shallowSetup({ data: { pagination: { number_of_pages: 10 } } });
    expect(wrapper).toMatchSnapshot();

})

it("should click page", () => {

    const clicker = jest.fn();

    const wrapper = shallowSetup({ data: { pagination: { number_of_pages: 10 } }, viewPage: jest.fn() })
    const pageEle = wrapper.find(".border-radius-100-percent").at(0)

    let result = clicker();

    pageEle.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);

})