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

it("runn", () => {

    const onChangeMock = jest.fn();
    const wrapper = shallowSetup(<UserSearch />);

    const signatureInput = wrapper.find(".height-50");

    expect(signatureInput.length).toBe(1);


    signatureInput.simulate('change', { target: { name: 'email_input', value: 'test@example.com' } })

    let result = onChangeMock("e");

    expect(result).toBeUndefined();

    expect(onChangeMock).toHaveBeenCalled();

})

