import React from 'react';
import { shallow } from 'enzyme';
import UserSearch from "../components/Dashboard/snippets/documents/UserSearch"



const shallowSetup = (props = {}) => {


    return shallow(<UserSearch {...props} />)
}

it('should match snapshot', () => {

    const selectUser = {}

    const wrapper = shallowSetup({ selectUser })
    expect(wrapper).toMatchSnapshot();
})

it("should handle searchUser", () => {

    const onChangeMock = jest.fn();
    const wrapper = shallowSetup(<UserSearch />);

    const searchUserDiv = wrapper.find(".height-50");

    expect(searchUserDiv.length).toBe(1);


    searchUserDiv.simulate('change', { target: { name: 'email_input', value: 'test@example.com' } })

    let result = onChangeMock("e");

    expect(result).toBeUndefined();

    expect(onChangeMock).toHaveBeenCalled();

})


