import React from 'react'
import ToolboxMenu from 'styles/styled-components/ToolboxMenu';

const FilterGroup = ({ renderFilterList }) => (
    <ToolboxMenu
        className={`
                    display-flex 
                    align-items-center 
                    justify-center 
                    cursor-pointer 
                    left-padding-15 
                    right-padding-15 
                    white 
                    border-radius-5 
                    box-shadow-less2 
                    size-pointeight-rem 
                    mustard-color 
                    right-margin-20`
        }>
        <img src={require(`images/icons/dashboard/filter.svg`)} className={`height-15 right-margin-10`} alt="Filter" />
        Filter
        <div className="top-padding-10">
            <div className="box-shadow-less2 border-radius-10 padding-10 white">
                {renderFilterList()}
            </div>
        </div>
    </ToolboxMenu>
)

export default FilterGroup;
