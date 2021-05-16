import React from 'react';
import { mount } from 'enzyme';
import UserList from "../components/Dashboard/snippets/UserList"


const shallowSetup = (props = {}) => {

    return mount(
        <UserList {...props} />
    )
}

it("should render properly with searching true", () => {
    const wrapper = shallowSetup({ users: { platformUsers: "123", searching: true, searchResults: "result", deleting: true } });
    expect(wrapper).toMatchSnapshot();
})

it("should render properly with searching false", () => {
    const wrapper = shallowSetup({ users: { platformUsers: "123", searching: false, updatingRole: true} });
    expect(wrapper).toMatchSnapshot();
})


