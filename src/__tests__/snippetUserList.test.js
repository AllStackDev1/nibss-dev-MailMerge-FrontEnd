import React from 'react';
import { mount } from 'enzyme';
import UserList from "../components/Dashboard/snippets/UserList"


const shallowSetup = (props = {}) => {

    return mount(
        <UserList {...props} />
    )
}

it("should render properly", () => {

    const wrapper = shallowSetup({ users: { platformUsers: "123", searching: true, searchResults: "result", platformUsers: "users" } });
    expect(wrapper).toMatchSnapshot();

})


