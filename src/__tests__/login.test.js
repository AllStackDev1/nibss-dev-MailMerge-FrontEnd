import React from 'react';
import { shallow } from 'enzyme';
import Login from "../components/auth/login"




/**
 * 
 * @param {objects} props 
 * @returns {ShallowWrapper}
 */

const shallowSetup = (props = {}) => {

    return shallow(<Login {...props} />)
}

test('check if component renders', () => {

})

describe('if users enter a wrong login details', () => {
    test('password entered', () => {

    })
    test('email address entered', () => {

    })
})

describe('if users enter the right login details', () => {

})