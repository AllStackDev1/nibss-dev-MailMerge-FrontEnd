import React from 'react';
import styled from 'styled-components';

const DocumentTab = ({ label, setTab, tab, index }) =>
    <Tab
        onClick={() => setTab(index)}
        className={`
            ${tab === index ? 'active-tab' : ''} 
            full-height size-pointnine-rem cursor-pointer left-padding-80 right-padding-100 display-flex align-items-center
        `}>
        {label}
    </Tab>

const Tab = styled.div`
                        &.active-tab {
                            color: #9E7D0A;
                            border-bottom: 1px solid #9E7D0A;
                        }
                    `;

export default DocumentTab;