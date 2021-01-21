import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import EmptySidebar from "../components/Dashboard/snippets/EmptySidebar"




/**
 * 
 * @param {objects} props 
 * @returns {ShallowWrapper}
 */

const shallowSetup = (props = {}) => {

    return mount(
        <EmptySidebar />
    )

}



describe("component renders", () => {

    it("should render without errors", () => {

        const wrapper = shallowSetup();
        expect(wrapper).toBeTruthy();
    })
})

