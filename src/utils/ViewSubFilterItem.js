import React, { useRef, useEffect } from "react";

/**
 * The component is about subgroup checkbox.
 * @param {array} props.arrayData
 * @param {bool} props.isChecked
 * @returns
 */
export default function ViewSubFilterItem(props) {
  const checkbox = useRef([]);
  const { arrayData: arr, mySubSelectAllGroup: mySubSelectAllGroup } = props;
  return (
    <ul className="list">
      {arr.map((item, index) => {
        return (
          <li key={index}>
            <input type="checkbox" name={item} ref={(el) => (checkbox.current[index] = el)} /> {item.filterValue}
          </li>
        );
      })}
    </ul>
  );
}
