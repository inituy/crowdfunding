import React from "react";

const DropdownMenu = (props) => (
  <select className="dropDownMenu">
    {props.items.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

export default DropdownMenu;
