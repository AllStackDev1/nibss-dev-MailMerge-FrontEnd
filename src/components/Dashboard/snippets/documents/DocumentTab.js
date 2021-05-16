import React from "react";
import styled from "styled-components";

const DocumentTab = ({ label, setTab, tab, index }) => (
  <Tab
    onClick={() => setTab(index)}
    className={`
            ${tab === index ? "active-tab" : ""} 
            full-height size-pointnine-rem cursor-pointer left-padding-80 right-padding-100 display-flex align-items-center
        `}
    data-testid="doc-tab"
  >
    {label}
  </Tab>
);

const Tab = styled.div`
  &.active-tab {
    color: #9e7d0a;
    border-bottom: 1px solid #9e7d0a;
  }
`;

export default DocumentTab;
