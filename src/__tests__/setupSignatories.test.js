import React from 'react';
import { shallow, mount } from 'enzyme';
import SetupSignatories from "../components/Dashboard/snippets/documents/SetupSignatories"



const shallowSetup = (props = {}) => {

    return shallow(<SetupSignatories {...props} />)
}

describe('handle setup signatoies component', () => {

    const addSignatoryMock = jest.fn();

    it("should render without error", () => {
        // const wrapper = shallowSetup({ document: { signatories: {} } })
        const wrapper = mount(<SetupSignatories addSignatory={addSignatoryMock} />)
        expect(wrapper).toBeTruthy();

        const result = addSignatoryMock("e")

        expect(result).toBeUndefined();
        expect(addSignatoryMock.mock.calls.length).toEqual(1);

        expect(addSignatoryMock).toHaveBeenCalledTimes(1);

        expect(addSignatoryMock).toHaveBeenCalled();

    })

})

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should submit form", () => {

    const wrapper = shallowSetup({ document: { signatories: [{ nibss: true }] }, selectUser: jest.fn() });
    const formElem = wrapper.find("form").at(1)

    formElem.simulate("submit", { preventDefault: () => { } })

    expect(formElem).toBeTruthy()
})

it("runn", () => {

    const wrapper = shallowSetup({ document: { signatories: [{ nibss: true }] } })
    const inputElem = wrapper.find("[data-test='input-name']")

    inputElem.simulate("change", { target: { name: "name", value: "value" } })
    expect(inputElem.length).toBe(1)


})
