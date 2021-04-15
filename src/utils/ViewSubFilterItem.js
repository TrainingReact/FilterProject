import React from "react";
export default function ViewSubFilterItem(props) {
  const arr = props.arrayData;
  return (
    <ul>
      {arr.map((item, index) => {
        return (
          <li key={index}>
            <input type="checkbox" name="selectAll" /> {item.filterValue}
          </li>
        );
      })}
    </ul>
  );
}
