import React, { useEffect } from 'react';
import { mount, shallow } from 'enzyme';
import AppendSignatureOpen from "../components/append-sginature-open/append-signature-open";






jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))

afterEach(() => {
    jest.clearAllMocks();
});


test("renders component", () => {

    const wrapper = shallow(<AppendSignatureOpen />)
    expect(wrapper).toBeTruthy();

})

test('create snapshot', () => {
    const wrapper = shallow(<AppendSignatureOpen />)
    expect(wrapper).toMatchSnapshot();
})

