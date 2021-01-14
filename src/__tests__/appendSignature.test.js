// import React from 'react';
// import { shallow, mount } from 'enzyme';
// import AppendSignature from "../components/Dashboard/AppendSignature"
// import { useSelector, Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducer from '../reducers/documentReducer';


// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual('react-router-dom'),
//     useParams: () => ({ documentId: 123 }),
// }))

// jest.mock("react", () => ({
//     ...jest.requireActual('react'),
//     useEffect: () => ("user1", "doc123", "123456")
// }))


// const shallowSetup = (props = {}) => {

//     jest.mock("react-redux", () => ({
//         ...jest.requireActual("react-redux"),
//         useSelector: jest.fn()
//     }))


//     const store = createStore(reducer, { document: "1234" });

//     return mount(
//         <Provider store={store}>
//             <AppendSignature {...props} />
//         </Provider>
//     )

// }

// beforeEach(() => {
//     useSelector.mockImplementation(callback => {
//         return callback({ documents: { document: "1234" } });
//     });

// });

// afterEach(() => {
//     useSelector.mockClear();
// });




// it("should render component", () => {


//     const wrapper = shallowSetup({ user: "user123", documentId: "1233", userToken: "11111" });

//     // wrapper.setProps({ user: "user1", documentId: "1234", userToken: "token1" })

//     expect(wrapper).toBeTruthy();
//     // expect(wrapper).toHaveBeenCalledWith({ user: "user123", documentId: "1233", userToken: "11111" })
// })

// it("should render component without errors", () => {

//     const wrapper = shallowSetup();
//     expect(wrapper.find('[data-test="component-append-signature"]').length).toBe(1);

// })

// it("", () => {

//     const stateMock = jest.fn();
//     const useSelectorMock = jest.fn(stateMock);

//     const wrapper = mount(<AppendSignature useSelector={useSelectorMock} />)

// })


import React, { useState } from 'react';
import { shallow } from 'enzyme';
import AppendSignature from "../components/Dashboard/AppendSignature"
import enableHooks from "jest-react-hooks-shallow";
import { useSelector } from 'react-redux';


enableHooks(jest)


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))

// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn(),
// }));


// jest.mock("../components/Dashboard/AppendSignature", () => mockFunction)

test("yolo", () => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }))

    const setDocumentMock = jest.fn();

    // beforeEach(() => {
    //     useState.mockImplementation(init => [{}, setDocumentMock])
    // })

    afterEach(() => {
        useSelector.mockClear();
    });

    useSelector.mockImplementation(callback => {
        return callback({ documents: { document: "1234" } });
    });



    // console.log(<AppendSignature user="user123" documentId="1233" userToken="11111" />);

    const renderSignatureInterfaceMock = jest.fn();
    const wrapper = shallow(<AppendSignature renderSignatureInterface={renderSignatureInterfaceMock} />)

    let result = renderSignatureInterfaceMock("e");
    expect(result).toBeUndefined();


    expect(renderSignatureInterfaceMock.mock.calls.length).toEqual(1)
    expect(wrapper.find('.lds-ring').length).toEqual(1)
    expect(wrapper).toBeTruthy();

})

it("shoukld render snap", () => {
    const wrapper = shallow(<AppendSignature />)

    wrapper.setProps({ user: "user1", documentId: "1234", userToken: "token1" })
    expect(wrapper).toMatchSnapshot()
})

