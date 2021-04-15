import React, { useRef, useEffect, useCallback, useState } from "react";

/**
 * The component is about subgroup checkbox.
 * @param {array} props.arrayData
 * @param {bool} props.isChecked
 * @returns
 */
export default function ViewSubFilterItem(props) {
  const [previous, setprevious] = useState([]);
  const checkbox = useRef([]);
  const { arrayData: arr, isChecked: isChecked } = props;

  //this code check if select group is checked or unchecked. All the sub group elements
  //should be checked if select group is checked. Otherwise, if select group isn't checked
  //the sub group should be returned as the previous case. isChecked is referred to select group checked.
  //To correctly recognize every sub element, checkbox ref is realized as an array.
  useEffect(() => {
    checkbox.current.map((element) => {
      if (isChecked) {
        console.log("previous");
        //  element.checked = true;
      } else {
        //  element.checked = false;
      }
    });
  }, [isChecked]);
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
