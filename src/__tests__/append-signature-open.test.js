import React from 'react';
import { shallow, mount } from 'enzyme';
import AppendSignatureOpen from "../components/append-sginature-open/append-signature-open";





jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))

jest.mock("react", () => ({
    ...jest.requireActual('react'),
    useEffect: () => ({})
}))

afterEach(() => {
    jest.clearAllMocks();
});




describe("", () => {



    test("renders component", () => {

        const wrapper = mount(<AppendSignatureOpen />)
        expect(wrapper).toBeTruthy();
    })


})

test('create snapshot', () => {
    const wrapper = shallow(<AppendSignatureOpen />)
    expect(wrapper).toMatchSnapshot();
})



