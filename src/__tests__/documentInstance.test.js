import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentInstance from "../components/Dashboard/DocumentInstance"
import { useDispatch, useSelector } from "react-redux";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))

const shallowSetup = (props = {}) => {

    return shallow(
        <DocumentInstance {...props} />
    )
}


it("should render properly", () => {

    const wrapper = shallowSetup({ user: "userId" });
    expect(wrapper).toMatchSnapshot();

})

it('should should go back on click', () => {

    const wrapper = shallowSetup({ user: "userId" });
    const backBtn = wrapper.find("[data-test='backbtn']")

    backBtn.simulate("click", {});

    expect(backBtn).toBeTruthy()

})