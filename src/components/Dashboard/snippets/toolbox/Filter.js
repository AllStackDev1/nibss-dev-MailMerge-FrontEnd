import React from "react";

const Filter = ({ index, onClick, name, checked }) => {
  return (
    <div
      key={index}
      className="smooth capitalize display-flex align-items-center bottom-margin-10"
    >
      <div className="width-30 right-margin-10">
        <input
          type="checkbox"
          id={`tag-${index}`}
          checked={checked}
          className="checkbox-s"
          onChange={onClick}
        />
        <label htmlFor={`tag-${index}`} className="no-shrink"></label>
      </div>

      <span role="button" onClick={onClick}>
        {name}
      </span>
    </div>
  );
};

export default Filter;
