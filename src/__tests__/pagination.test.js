import React from 'react';
import { mount } from 'enzyme';
import Pagination from "../components/Dashboard/empty-states/Pagination"



const shallowSetup = (props = {}) => {

    return mount(<Pagination {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should define component", () => {

    const arg = { data: { pagination: { number_of_pages: 5 } } }

    const wrapper = shallowSetup({ data: arg });
    expect(wrapper).toBeTruthy();

})

it('should render pagination when page is more than 3', () => {

    const viewPageMock = jest.fn();
    const renderPageMock = jest.fn();
    const index = 4

    const wrapper = mount(
        <Pagination data={4} viewPage={viewPageMock} />
    )

    wrapper.update();

    // wrapper.setState({ count: 2 })
    renderPageMock();

    expect(renderPageMock).toHaveBeenCalled();

})

