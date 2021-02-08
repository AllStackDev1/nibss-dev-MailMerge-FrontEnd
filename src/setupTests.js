// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import enableHooks from 'jest-react-hooks-shallow';
import fetchMock from "jest-fetch-mock"

Enzyme.configure({ adapter: new EnzymeAdapter() });

fetchMock.enableMocks()


enableHooks(jest);

// "setupFilesAfterEnv": ["./src/__tests__/appendSignature.test.js"]

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;