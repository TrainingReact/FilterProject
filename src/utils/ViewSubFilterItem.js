import React from "react";

/**
 * The component is about subgroup checkbox.
 * @param {array} props.arrayData
 * @param {bool} props.isChecked
 * @returns
 */
export default function ViewSubFilterItem(props) {
  const { arr: arr } = props;
  return (
    <ul className="list">
      {arr.map((item, index) => {
        return (
          <li key={index}>
            {index}
            <input type="checkbox" name={item} /> {item.filterValue}
          </li>
        );
      })}
    </ul>
  );
}
