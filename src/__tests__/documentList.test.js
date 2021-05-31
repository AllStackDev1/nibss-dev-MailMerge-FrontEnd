import React from 'react';
import { mount } from 'enzyme';
import DocumentList from "../components/Dashboard/snippets/documents/DocumentList"


const shallowSetup = (props = {}) => {

    return mount(
        <DocumentList {...props} />
    )
}

it("should render properly", () => {

    const wrapper = shallowSetup({ documents: { documents: { } }, fetching: true });
    expect(wrapper).toMatchSnapshot();

})

it("should list out all documents", () => {

    const wrapper = shallowSetup({ documents: { documents: { data: [{ pagination: { number_of_pages: 10 } }], pagination: { number_of_pages: 10 } } }, fetching: false })
    expect(wrapper.find("Document").length).toBe(1);
})