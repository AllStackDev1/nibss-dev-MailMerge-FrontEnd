import React from 'react';
import { mount } from 'enzyme';
import ViewTag from "../components/Dashboard/snippets/ViewTag"


const shallowSetup = (props = {}) => {

    return mount(
        <ViewTag {...props} />
    )
}

it("should render properly", () => {

    const wrapper = shallowSetup();
    expect(wrapper).toMatchSnapshot();

})


