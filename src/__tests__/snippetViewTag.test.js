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

it("should handle div click", () => {

    const clicker = jest.fn();

    const wrapper = shallowSetup();
    const elem = wrapper.find(".flex-direction-column");
    let result = clicker();

    elem.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);
})


it("should handle create tag click", () => {

    const clicker = jest.fn();

    const wrapper = shallowSetup({ setModal: jest.fn() });
    const elem = wrapper.find("[data-test='view-tag']");
    let result = clicker();

    elem.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);

})

it("should render add tags", () => {

    const wrapper = shallowSetup({ toAddTag: "123", recipients: { data: [{ _id: "123", name: "name" }] }, updating: true });
    expect(wrapper.find("[data-test='add-tag']").length).toBe(1);

})

it("should add tags", () => {

    const wrapper = shallowSetup({
        toAddTag: "123",
        toAddTags: [],
        setToAddTags: jest.fn(),
        recipients: { data: [{ _id: "123", name: "name" }] },
        updating: true, tags: [{ name: "tag-name" }]
    });
    expect(wrapper.find("[data-test='tag']").length).toBe(2);

    const tagEle = wrapper.find("[data-test='tag']").at(0)

    tagEle.simulate("click")

})
